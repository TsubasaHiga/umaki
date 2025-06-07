import { test, expect } from '@playwright/test'

test.describe('Umaki DOM Utilities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => window.umaki !== undefined)
  })

  test('should test element manipulation functions', async ({ page }) => {
    // Test setAttribute
    await page.evaluate(() => {
      const element = document.querySelector('[data-testid="wrap-target"]')
      window.umaki.setAttribute(element, 'data-custom', 'test-value')
    })

    const customAttr = await page.getAttribute('[data-testid="wrap-target"]', 'data-custom')
    expect(customAttr).toBe('test-value')
  })

  test('should test getEventPaths', async ({ page }) => {
    const paths = await page.evaluate(() => {
      const element = document.querySelector('[data-testid="wrap-target"]')
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'target', { value: element })
      return window.umaki.getEventPaths(event)
    })

    expect(Array.isArray(paths)).toBe(true)
    expect(paths.length).toBeGreaterThan(0)
  })

  test('should test getParentList', async ({ page }) => {
    const parents = await page.evaluate(() => {
      const element = document.querySelector('[data-testid="wrap-target"]')
      return window.umaki.getParentList(element).map(el => el.tagName)
    })

    expect(Array.isArray(parents)).toBe(true)
    expect(parents).toContain('DIV')
    expect(parents).toContain('BODY')
  })

  test('should test style property functions', async ({ page }) => {
    // Set a style property
    await page.evaluate(() => {
      const element = document.querySelector('[data-testid="wrap-target"]')
      window.umaki.setStylePropertyValue(element, 'color', 'red')
    })

    // Get the style property
    const color = await page.evaluate(() => {
      const element = document.querySelector('[data-testid="wrap-target"]')
      return window.umaki.getStylePropertyValue(element, 'color')
    })

    expect(color).toContain('red')
  })

  test('should test viewport and scroll functions', async ({ page }) => {
    const documentHeight = await page.evaluate(() => {
      return window.umaki.getDocumentHeight()
    })
    expect(typeof documentHeight).toBe('number')
    expect(documentHeight).toBeGreaterThan(0)

    const scrollbarWidth = await page.evaluate(() => {
      return window.umaki.getScrollbarWidth()
    })
    expect(typeof scrollbarWidth).toBe('number')
    expect(scrollbarWidth).toBeGreaterThanOrEqual(0)
  })

  test('should test string manipulation', async ({ page }) => {
    const result = await page.evaluate(() => {
      const length = window.umaki.getStringLength('test string')
      const classNames = window.umaki.getClassNames(['class1', 'class2', null, 'class3'])
      return { length, classNames }
    })

    expect(result.length).toBe(11)
    expect(result.classNames).toBe('class1 class2 class3')
  })
})