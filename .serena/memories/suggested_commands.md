# Suggested Commands

## Package Management
```bash
# Install dependencies
pnpm install
```

## Development
```bash
# Start development server
pnpm dev
```

## Build
```bash
# Build for production (TypeScript + Vite)
pnpm build

# Build with bundle analysis
pnpm analyze
```

## Testing
```bash
# Run all tests in watch mode
pnpm test

# Run tests once (no watch mode)
pnpm test:run

# Run a single test file
pnpm test src/libs/get/getAspectRatio.test.ts

# Run tests with coverage
pnpm coverage
# or
pnpm test:coverage
```

## Code Quality
```bash
# Lint code
pnpm lint

# Format code
pnpm format
```

## System Utilities (Darwin/macOS)
```bash
# Git commands
git status
git add .
git commit -m "message"
git push

# File operations
ls -la
cd <directory>
find . -name "*.ts"
grep -r "pattern" .
```
