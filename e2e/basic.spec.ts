import { test, expect } from '@playwright/test'

test.describe('Umaki Library E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load the test application', async ({ page }) => {
    await expect(page).toHaveTitle('Umaki E2E Test App')
    await expect(page.locator('h1')).toContainText('Umaki E2E Test Application')
  })

  test('should load umaki library', async ({ page }) => {
    // Wait for the library to load
    await page.waitForFunction(() => window.umaki !== undefined)
    
    // Check that umaki functions are available
    const umakiFunctions = await page.evaluate(() => Object.keys(window.umaki || {}))
    expect(umakiFunctions.length).toBeGreaterThan(0)
    
    // Check for some expected functions
    expect(umakiFunctions).toContain('getOrientation')
    expect(umakiFunctions).toContain('checkDeviceSize')
    expect(umakiFunctions).toContain('toBoolean')
  })

  test('should test Get functions', async ({ page }) => {
    // Test getOrientation
    await page.click('[data-testid="test-get-orientation"]')
    await expect(page.locator('[data-testid="get-results"]')).toContainText('Orientation:')
    
    // Test getClassNames
    await page.click('[data-testid="test-get-classnames"]')
    await expect(page.locator('[data-testid="get-results"]')).toContainText('ClassNames:')
    
    // Test getDocumentHeight
    await page.click('[data-testid="test-get-document-height"]')
    await expect(page.locator('[data-testid="get-results"]')).toContainText('Document Height:')
  })

  test('should test Is functions', async ({ page }) => {
    // Test isTouchSupport
    await page.click('[data-testid="test-is-touch"]')
    await expect(page.locator('[data-testid="is-results"]')).toContainText('Touch Support:')
    
    // Test checkDeviceSize
    await page.click('[data-testid="test-device-size"]')
    await expect(page.locator('[data-testid="is-results"]')).toContainText('Device Size:')
  })

  test('should test Convert functions', async ({ page }) => {
    // Test toBoolean
    await page.click('[data-testid="test-to-boolean"]')
    await expect(page.locator('[data-testid="convert-results"]')).toContainText('Boolean conversions:')
    
    // Test JSON conversion
    await page.click('[data-testid="test-json-convert"]')
    await expect(page.locator('[data-testid="convert-results"]')).toContainText('JSON Convert:')
  })

  test('should test Config functions', async ({ page }) => {
    await page.click('[data-testid="test-config"]')
    await expect(page.locator('[data-testid="config-results"]')).toContainText('Original Breakpoint:')
    await expect(page.locator('[data-testid="config-results"]')).toContainText('New Breakpoint:')
  })

  test('should test Transform functions', async ({ page }) => {
    await page.click('[data-testid="test-wrap-text"]')
    await expect(page.locator('[data-testid="transform-results"]')).toContainText('Text wrapped with spans')
  })

  test('should test Scroll functions', async ({ page }) => {
    // Test isScrollable
    await page.click('[data-testid="test-scrollable"]')
    await expect(page.locator('[data-testid="scroll-results"]')).toContainText('Container is scrollable:')
    
    // Test scroll to center
    await page.click('[data-testid="test-scroll-center"]')
    await expect(page.locator('[data-testid="scroll-results"]')).toContainText('Scrolled to center')
  })

  test('should verify library functions work correctly', async ({ page }) => {
    // Test specific function behavior
    const orientation = await page.evaluate(() => {
      return window.umaki.getOrientation()
    })
    expect(['portrait', 'landscape']).toContain(orientation)

    const deviceSize = await page.evaluate(() => {
      return window.umaki.checkDeviceSize()
    })
    expect(['sm', 'md']).toContain(deviceSize)

    const booleanResult = await page.evaluate(() => {
      return window.umaki.toBoolean('true')
    })
    expect(booleanResult).toBe(true)
  })
})