// Packs the package and verifies that every export entry can be loaded
// from Node.js with both `import` and `require`.
// Run after `pnpm build`: node .github/scripts/smoke-test-package.mjs
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
)
const packageJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8')
)
const specifiers = Object.keys(packageJson.exports).map((key) =>
  key === '.' ? packageJson.name : `${packageJson.name}/${key.slice(2)}`
)

const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'umaki-smoke-'))
try {
  execFileSync('pnpm', ['pack', '--pack-destination', workDir], {
    cwd: rootDir,
    stdio: 'ignore'
  })
  const tarball = fs.readdirSync(workDir).find((file) => file.endsWith('.tgz'))
  fs.writeFileSync(path.join(workDir, 'package.json'), '{"private":true}')
  execFileSync('npm', ['install', '--no-audit', '--no-fund', `./${tarball}`], {
    cwd: workDir,
    stdio: 'ignore'
  })

  let failed = false
  for (const specifier of specifiers) {
    for (const [mode, code] of [
      ['import', `await import(${JSON.stringify(specifier)})`],
      ['require', `require(${JSON.stringify(specifier)})`]
    ]) {
      const args =
        mode === 'import' ? ['--input-type=module', '-e', code] : ['-e', code]
      try {
        execFileSync(process.execPath, args, { cwd: workDir, stdio: 'pipe' })
        console.log(`ok   ${mode} ${specifier}`)
      } catch (error) {
        failed = true
        const stderr = error.stderr?.toString().split('\n').find(Boolean)
        console.error(`FAIL ${mode} ${specifier}: ${stderr}`)
      }
    }
  }
  if (failed) process.exit(1)
} finally {
  fs.rmSync(workDir, { recursive: true, force: true })
}
