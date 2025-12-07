# Task Completion Checklist

When completing a task in this project, follow these steps:

## 1. Code Quality Checks
```bash
# Format the code
pnpm format

# Lint the code
pnpm lint
```

## 2. Testing
```bash
# Run all tests
pnpm test:run

# Or run specific test for the changed utility
pnpm test src/libs/<category>/<utilityName>.test.ts
```

## 3. Build Verification
```bash
# Ensure build succeeds
pnpm build
```

## 4. Pre-commit Hook
Lefthook is configured to automatically run Biome checks on staged files before commit:
- Runs `biome check --write` on JS/TS/JSON files
- Auto-stages fixed files

## 5. New Utility Checklist
When adding a new utility:
1. Create `utilityName.ts` in appropriate category folder
2. Create `utilityName.test.ts` with comprehensive tests
3. Export from category's `index.ts`
4. Ensure exports reach root `src/index.ts`

## 6. Commit Guidelines
- Ensure all tests pass before committing
- Pre-commit hooks will auto-format code
- Write clear, descriptive commit messages
