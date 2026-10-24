import { getStylePropertyValue } from './get-style-property-value'

describe('getStylePropertyValue', () => {
  it('should return the value of the given CSS custom property', () => {
    // Mock getComputedStyle
    const mockGetComputedStyle = vi.fn().mockReturnValue({
      getPropertyValue: vi.fn().mockReturnValue('mock-value')
    })
    global.getComputedStyle = mockGetComputedStyle

    const result = getStylePropertyValue('--mock-property')
    expect(result).toBe('mock-value')
    expect(mockGetComputedStyle).toHaveBeenCalledWith(document.documentElement)
    expect(mockGetComputedStyle().getPropertyValue).toHaveBeenCalledWith(
      '--mock-property'
    )
  })
})

describe('getStylePropertyValue (SSR)', () => {
  it('should be safe in SSR environment (window undefined)', () => {
    vi.stubGlobal('window', undefined)
    try {
      document.documentElement.style.setProperty('--ssr', '1px')
      expect(getStylePropertyValue('--ssr')).toBe('')
      document.documentElement.style.removeProperty('--ssr')
    } finally {
      vi.unstubAllGlobals()
    }
  })
})
