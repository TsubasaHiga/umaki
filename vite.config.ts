/// <reference types="vitest" />

import * as path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

// isProduction
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig(({ mode }) => {
  return {
    plugins: [dts(), tsconfigPaths()],
    test: {
      globals: true,
      environment: 'happy-dom',
      include: ['src/libs/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@libs': path.resolve(__dirname, './src/libs')
      }
    },
    esbuild: isProduction
      ? {
          drop: ['debugger'],
          pure: [
            'console.log',
            'console.info',
            'console.table',
            'console.time',
            'console.timeEnd',
            'console.trace'
          ]
        }
      : {},
    build: {
      lib: {
        entry: './src/index.ts',
        name: 'umaki',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        output: [
          {
            format: 'es',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: ({ name: fileName }) => {
              return `${fileName}.es.js`
            },
            exports: 'named'
          },
          {
            format: 'cjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            entryFileNames: ({ name: fileName }) => {
              return `${fileName}.cjs.js`
            },
            exports: 'named'
          }
        ],
        external: [
          'dayjs',
          'image-size',
          'is-touch-device',
          'isomorphic-dompurify',
          'query-string',
          'runes2',
          'store2',
          'ua-parser-js'
        ],
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
