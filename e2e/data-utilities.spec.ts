import { test, expect } from '@playwright/test'

test.describe('Umaki Data Utilities', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForFunction(() => window.umaki !== undefined)
  })

  test('should test conversion utilities', async ({ page }) => {
    const results = await page.evaluate(() => {
      const toBooleanTests = [
        { input: 'true', expected: true },
        { input: 'false', expected: false },
        { input: '1', expected: true },
        { input: '0', expected: false },
        { input: 'yes', expected: true },
        { input: 'no', expected: false }
      ]

      const boolResults = toBooleanTests.map(test => ({
        input: test.input,
        output: window.umaki.toBoolean(test.input),
        expected: test.expected
      }))

      const jsonTest = window.umaki.jsonStringToJsonObject('{"key": "value", "number": 42}')
      
      const positiveNumberTests = [
        { input: -5, expected: 5 },
        { input: 10, expected: 10 },
        { input: '15', expected: 15 },
        { input: 0, expected: 0 }
      ]

      const numberResults = positiveNumberTests.map(test => ({
        input: test.input,
        output: window.umaki.toPositiveNumber(test.input),
        expected: test.expected
      }))

      return { boolResults, jsonTest, numberResults }
    })

    // Test boolean conversions
    results.boolResults.forEach(result => {
      expect(result.output).toBe(result.expected)
    })

    // Test JSON conversion
    expect(results.jsonTest).toEqual({ key: 'value', number: 42 })

    // Test positive number conversions
    results.numberResults.forEach(result => {
      expect(result.output).toBe(result.expected)
    })
  })

  test('should test mathematical utilities', async ({ page }) => {
    const mathResults = await page.evaluate(() => {
      const gcd1 = window.umaki.getGcd(48, 18) // Should be 6
      const gcd2 = window.umaki.getGcd(100, 25) // Should be 25
      
      const aspectRatio1 = window.umaki.getAspectRatio(1920, 1080) // Should be 16:9
      const aspectRatio2 = window.umaki.getAspectRatio(1000, 1000) // Should be 1:1

      return { gcd1, gcd2, aspectRatio1, aspectRatio2 }
    })

    expect(mathResults.gcd1).toBe(6)
    expect(mathResults.gcd2).toBe(25)
    expect(mathResults.aspectRatio1).toBe('16:9')
    expect(mathResults.aspectRatio2).toBe('1:1')
  })

  test('should test storage utilities', async ({ page }) => {
    const storageResults = await page.evaluate(() => {
      // Test session storage
      window.umaki.setSessionStorage('testKey', 'testValue')
      const retrieved = window.umaki.getSessionStorage('testKey')
      
      // Test with object
      const testObj = { name: 'test', value: 123 }
      window.umaki.setSessionStorage('testObj', testObj)
      const retrievedObj = window.umaki.getSessionStorage('testObj')
      
      // Remove storage
      window.umaki.removeSessionStorage('testKey')
      const afterRemove = window.umaki.getSessionStorage('testKey')

      return { retrieved, retrievedObj, afterRemove }
    })

    expect(storageResults.retrieved).toBe('testValue')
    expect(storageResults.retrievedObj).toEqual({ name: 'test', value: 123 })
    expect(storageResults.afterRemove).toBeNull()
  })

  test('should test date utilities', async ({ page }) => {
    const dateResults = await page.evaluate(() => {
      const now = new Date()
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      const isAfterNow = window.umaki.isAfterDateTime(tomorrow, now)
      const isNotAfterNow = window.umaki.isAfterDateTime(yesterday, now)
      
      const isBetween = window.umaki.isBetweenDateTime(now, yesterday, tomorrow)
      const isNotBetween = window.umaki.isBetweenDateTime(yesterday, now, tomorrow)

      return { isAfterNow, isNotAfterNow, isBetween, isNotBetween }
    })

    expect(dateResults.isAfterNow).toBe(true)
    expect(dateResults.isNotAfterNow).toBe(false)
    expect(dateResults.isBetween).toBe(true)
    expect(dateResults.isNotBetween).toBe(false)
  })

  test('should test object utilities', async ({ page }) => {
    const objectResults = await page.evaluate(() => {
      const testObj = { a: 1, b: 2, c: 3 }
      
      const hasKeyA = window.umaki.isKeyExists(testObj, 'a')
      const hasKeyD = window.umaki.isKeyExists(testObj, 'd')
      
      return { hasKeyA, hasKeyD }
    })

    expect(objectResults.hasKeyA).toBe(true)
    expect(objectResults.hasKeyD).toBe(false)
  })
})