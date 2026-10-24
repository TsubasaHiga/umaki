// Packs the package and verifies that every export entry can be loaded
// from Node.js with both `import` and `require`, and that functions using
// dependencies (especially ESM-only ones) work in both module systems.
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

// [label, code that throws if the result is wrong]; `m` is the root module
const CALL_CHECKS = [
  // query-string is ESM-only (#202)
  [
    'getQueryParams',
    "if (String(m.getQueryParams('a', { searchString: '?a=1,2' })) !== '1,2') throw new Error('unexpected result')"
  ],
  [
    'htmlSanitize',
    "if (m.htmlSanitize('<script>x</script><p>ok</p>') !== '<p>ok</p>') throw new Error('unexpected result')"
  ],
  [
    'changeDateStringToSpecificFormat',
    "if (m.changeDateStringToSpecificFormat('2024-01-02T03:04:05Z', 'YYYY/MM/DD HH:mm', 'Asia/Tokyo') !== '2024/01/02 12:04') throw new Error('unexpected result')"
  ]
]

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
  const run = (label, mode, specifier, body = '') => {
    const load =
      mode === 'import'
        ? `const m = await import(${JSON.stringify(specifier)})`
        : `const m = require(${JSON.stringify(specifier)})`
    const args =
      mode === 'import'
        ? ['--input-type=module', '-e', `${load}\n${body}`]
        : ['-e', `${load}\n${body}`]
    try {
      execFileSync(process.execPath, args, { cwd: workDir, stdio: 'pipe' })
      console.log(`ok   ${mode} ${label}`)
    } catch (error) {
      failed = true
      const stderr = error.stderr
        ?.toString()
        .split('\n')
        .find((line) => /Error/.test(line))
      console.error(`FAIL ${mode} ${label}: ${stderr}`)
    }
  }

  for (const specifier of specifiers) {
    for (const mode of ['import', 'require']) run(specifier, mode, specifier)
  }
  for (const [label, body] of CALL_CHECKS) {
    for (const mode of ['import', 'require']) {
      run(`${packageJson.name}.${label}()`, mode, packageJson.name, body)
    }
  }
  if (failed) process.exit(1)
} finally {
  fs.rmSync(workDir, { recursive: true, force: true })
}
