# Code Style and Conventions

## Formatting (Biome)
- **Quotes**: Single quotes (`'`)
- **Semicolons**: As needed (no trailing semicolons)
- **Trailing Commas**: None
- **Indent Style**: Spaces
- **JSX Quote Style**: Single quotes

## TypeScript
- Target: ES2020
- Strict mode enabled
- No unused locals/parameters allowed
- No fallthrough in switch cases

## Module Pattern
Each utility follows a consistent pattern:
1. `utilityName.ts` - Implementation file
2. `utilityName.test.ts` - Co-located test file
3. Category `index.ts` - Re-exports all utilities in that category
4. Root `src/index.ts` - Re-exports all categories

## Function Style
- Functions are exported as `const` arrow functions
- Type annotations on parameters and return types
- Example:
```typescript
export const getAspectRatio = (
  w: number,
  h: number
): { w: number; h: number } => {
  const gcd = getGcd(w, h)
  return { w: w / gcd, h: h / gcd }
}
```

## Test Style
- Use Vitest globals (`describe`, `it`, `expect`)
- Import tested function at the top
- Group tests with `describe` block
- Use descriptive `it` statements
- Example:
```typescript
import { getAspectRatio } from './getAspectRatio'

describe('getAspectRatio', () => {
  it('should return the correct aspect ratio for 1920x1080', () => {
    const result = getAspectRatio(1920, 1080)
    expect(result).toEqual({ w: 16, h: 9 })
  })
})
```

## Directory Structure
Utilities organized by category in `src/libs/`:
- `config/` - Global configuration
- `control/` - Scroll control, video playback
- `convert/` - Data transformation
- `eventControl/` - debounce, throttle
- `get/` - Value retrieval
- `is/` - Boolean checks
- `remove/` - DOM/storage removal
- `security/` - HTML sanitization
- `set/` - DOM/storage setters
- `to/` - Type conversions
- `transform/` - DOM transformations
- `wait/` - Async utilities

## Linting Rules
- Recommended Biome rules enabled
- `noNonNullAssertion`: off
- `useBlockStatements`: off
