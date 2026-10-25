/// <reference types="vitest" />

import * as fs from 'node:fs'
import * as path from 'node:path'
import license from 'rollup-plugin-license'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageJson from './package.json' with { type: 'json' }

// Get all library category directories
const libsDir = path.resolve(import.meta.dirname, 'src/libs')
const categoryDirs = fs
  .readdirSync(libsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

// Build entry points for each category
const categoryEntries = Object.fromEntries(
  categoryDirs.map((category) => [
    `libs/${category}/index`,
    path.resolve(libsDir, category, 'index.ts')
  ])
)

// Runtime dependencies (and their subpaths) are not bundled
const dependencies = Object.keys(packageJson.dependencies)

// banner
const banner = `/*!
 * name: ${packageJson.name}
 * version: v${packageJson.version}
 * description: ${packageJson.description}
 * author: ${packageJson.author}
 * homepage: ${packageJson.homepage}
 * Released under the ${packageJson.license} License
 *
 * This software includes dependencies licensed under MIT, ISC, BSD-3-Clause, and Apache-2.0.
 * For license information, please see LICENSE.txt
 */
`

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      tsconfigPaths: true
    },
    plugins: [
      // Separate .d.mts / .d.cts with extensions in relative imports, so node16 / nodenext can resolve the types
      dts({
        exclude: ['src/**/*.test.ts'],
        outDirs: [
          { dir: 'dist', moduleFormat: 'esm' },
          { dir: 'dist', moduleFormat: 'cjs' }
        ]
      }),
      license({
        sourcemap: true,
        thirdParty: {
          output: path.join(import.meta.dirname, 'dist/LICENSE.txt')
        }
      })
    ],
    test: {
      globals: true,
      environment: 'happy-dom',
      include: ['src/libs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
    },
    build: {
      minify: false,
      lib: {
        entry: {
          index: './src/index.ts',
          ...categoryEntries
        },
        name: 'umaki',
        fileName: (format) => `index.${format}.js`
      },
      rolldownOptions: {
        output: [
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: ({ name: fileName }) => {
              return `${fileName}.es.js`
            },
            exports: 'named',
            // Only on entry files; per-module banners would add ~400 bytes to every file
            banner: (chunk) => (chunk.isEntry ? banner : ''),
            // Keep the banner (legal) and @__PURE__ annotations for tree shaking, drop JSDoc
            comments: { legal: true, annotation: true, jsdoc: false }
          },
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: ({ name: fileName }) => {
              return `${fileName}.cjs`
            },
            exports: 'named',
            // Only on entry files; per-module banners would add ~400 bytes to every file
            banner: (chunk) => (chunk.isEntry ? banner : ''),
            // Keep the banner (legal) and @__PURE__ annotations for tree shaking, drop JSDoc
            comments: { legal: true, annotation: true, jsdoc: false }
          }
        ],
        // 完全一致だと dayjs/plugin/* などのサブパスがバンドルされ dist/node_modules に出力される
        external: (id) =>
          dependencies.some((dep) => id === dep || id.startsWith(`${dep}/`)),
        plugins: [
          mode === 'analyze' &&
            visualizer({
              open: true,
              filename: './analyze/stats.html',
              gzipSize: true
            })
        ]
      }
    }
  }
})
