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

describe('removeStylePropertyValue (SSR)', () => {
  it('should be safe in SSR environment (window undefined)', () => {
    vi.stubGlobal('window', undefined)
    try {
      document.documentElement.style.setProperty('--ssr', '1px')
      removeStylePropertyValue('--ssr')
      expect(document.documentElement.style.getPropertyValue('--ssr')).toBe(
        '1px'
      )
      document.documentElement.style.removeProperty('--ssr')
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
