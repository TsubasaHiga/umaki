import { removeStylePropertyValue } from './remove-style-property-value'

describe('removeStylePropertyValue', () => {
  beforeEach(() => {
    // Set a custom property before each test
    document.documentElement.style.setProperty('--test-property', 'value')
  })

  it('should remove the specified CSS custom property', () => {
    removeStylePropertyValue('--test-property')
    const propertyValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--test-property')
    expect(propertyValue).toBe('')
  })

  it('should not throw an error if the property does not exist', () => {
    expect(() =>
      removeStylePropertyValue('--non-existent-property')
    ).not.toThrow()
  })
})
