/// <reference types="vitest" />

import * as path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

// isProduction
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
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
      fileName: 'index'
    }
  }
})
