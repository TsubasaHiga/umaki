import { test, expect } from '@playwright/test'

test.describe('Umaki Responsive and Device Detection', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => window.umaki !== undefined)
  })

  test('should detect device orientation changes', async ({ page }) => {
    // Test portrait (default)
    let orientation = await page.evaluate(() => window.umaki.getOrientation())
    expect(['portrait', 'landscape']).toContain(orientation)

    // Simulate landscape mode
    await page.setViewportSize({ width: 1200, height: 800 })
    orientation = await page.evaluate(() => window.umaki.getOrientation())
    expect(orientation).toBe('landscape')

    // Simulate portrait mode
    await page.setViewportSize({ width: 800, height: 1200 })
    orientation = await page.evaluate(() => window.umaki.getOrientation())
    expect(orientation).toBe('portrait')
  })

  test('should detect device size correctly', async ({ page }) => {
    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 })
    let deviceSize = await page.evaluate(() => window.umaki.checkDeviceSize())
    expect(deviceSize).toBe('md')

    // Test mobile size
    await page.setViewportSize({ width: 400, height: 800 })
    deviceSize = await page.evaluate(() => window.umaki.checkDeviceSize())
    expect(deviceSize).toBe('sm')
  })

  test('should handle configuration changes', async ({ page }) => {
    // Change breakpoint and test device size detection
    await page.evaluate(() => {
      window.umaki.setConfig({ BREAKPOINT: 1000 })
    })

    await page.setViewportSize({ width: 900, height: 600 })
    const deviceSize = await page.evaluate(() => window.umaki.checkDeviceSize())
    expect(deviceSize).toBe('sm') // Should be small because 900 < 1000

    await page.setViewportSize({ width: 1100, height: 600 })
    const deviceSizeLarge = await page.evaluate(() => window.umaki.checkDeviceSize())
    expect(deviceSizeLarge).toBe('md') // Should be medium because 1100 > 1000
  })

  test('should test touch support detection', async ({ page }) => {
    const isTouchSupport = await page.evaluate(() => window.umaki.isTouchSupport())
    expect(typeof isTouchSupport).toBe('boolean')
    // In a desktop browser, this will typically be false
    // On mobile devices, it would be true
  })

  test('should test browser detection', async ({ page }) => {
    const isSafari = await page.evaluate(() => window.umaki.isSafari())
    expect(typeof isSafari).toBe('boolean')
  })
})