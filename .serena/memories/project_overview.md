# Umaki Project Overview

## Purpose
Umaki is a TypeScript utility library for web development, providing commonly used functions for DOM manipulation, event handling, device detection, and more. It's published as an npm package (`umaki`) with both ESM and CJS builds.

## Tech Stack
- **Language**: TypeScript (ES2020 target)
- **Package Manager**: pnpm (v10.11.0)
- **Build Tool**: Vite
- **Test Framework**: Vitest with happy-dom environment
- **Linting/Formatting**: Biome
- **Git Hooks**: Lefthook

## Dependencies
Core dependencies (not bundled):
- dayjs - Date manipulation
- image-size - Image dimension detection
- isomorphic-dompurify - HTML sanitization
- md5 - Hash generation
- query-string - URL query parsing
- runes2 - Unicode string handling
- store2 - LocalStorage/SessionStorage wrapper
- ua-parser-js - User agent parsing

## Build Output
Dual format output to `dist/`:
- ESM: `*.es.js` (preserveModules)
- CJS: `*.cjs.js` (preserveModules)
- Types: `*.d.ts`

## Path Aliases
```typescript
@/*     -> src/*
@libs/* -> src/libs/*
```

## Repository
- Homepage: https://github.com/TsubasaHiga/umaki
- License: MIT
