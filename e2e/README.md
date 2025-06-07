# E2E Testing with Playwright

This project includes comprehensive End-to-End (E2E) testing using Playwright to verify the functionality of the Umaki utility library in real browser environments.

## Test Setup

- **Framework**: Playwright Test
- **Test Files**: Located in the `e2e/` directory
- **Test Application**: Simple HTML app in `test-app/` directory
- **Configuration**: `playwright.config.ts`

## Running Tests

### Local Development

```bash
# Install dependencies and build the library
npm install
npm run build

# Start the test application server
npm run test-app:serve

# Run E2E tests (in another terminal)
npm run test:e2e

# Run specific test file
npx playwright test e2e/basic.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed

# Generate test report
npx playwright show-report
```

### Test Structure

#### Test Files:
- `basic.spec.ts` - Core library loading and basic functionality
- `dom-utilities.spec.ts` - DOM manipulation and element functions
- `data-utilities.spec.ts` - Data conversion and utility functions  
- `responsive.spec.ts` - Responsive design and device detection

#### Test Coverage:
- **Get Functions**: Orientation, document height, class names, etc.
- **Is Functions**: Device detection, touch support, browser detection
- **Convert Functions**: Boolean conversion, JSON parsing, number conversion
- **Transform Functions**: Text manipulation, DOM transformations
- **Config Functions**: Configuration management
- **Scroll Functions**: Scroll utilities and scroll detection
- **Storage Functions**: Session storage operations
- **Math Functions**: GCD, aspect ratio calculations
- **Date Functions**: Date comparison utilities

## GitHub Actions

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/e2e.yml`) that:

- Runs tests weekly and on manual trigger
- Uses parallel execution across 4 shards
- Tests across multiple browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- Caches browsers and dependencies
- Generates HTML reports with screenshots and traces
- Merges test reports from all shards
- Deploys reports to GitHub Pages (for PR tests)
- Comments test results on Pull Requests

## Browser Support

Tests are configured to run on:
- Desktop Chrome (Chromium)
- Desktop Firefox  
- Desktop Safari (WebKit)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

## Test Application

The test application (`test-app/index.html`) provides:
- Interactive UI for manually testing library functions
- ES module import of the built library
- Global exposure of library functions for Playwright testing
- Test sections for each category of utilities
- Visual feedback for function execution

## Configuration

Key configuration options in `playwright.config.ts`:
- Parallel execution enabled
- Retry on failure (CI only)
- HTML and blob reporters
- Trace collection on retry
- Test server auto-start
- Multiple browser projects
- Base URL configuration