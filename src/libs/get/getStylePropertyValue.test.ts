import { getStylePropertyValue } from './getStylePropertyValue'

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
