import type { Mock } from 'vitest'
import { getStylePropertyValue } from './get-style-property-value'
import { getStylePropertyValueToNumber } from './get-style-property-value-to-number'

vi.mock('@libs/get/get-style-property-value')

describe('getStylePropertyValueToNumber', () => {
  it('should return the numeric value of a CSS custom property', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('42')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(42)
  })

  it('should return 0 if the value cannot be parsed as a number', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('invalid')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(0)
  })

  it('should return 0 if the value is an empty string', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(0)
  })

  it('should return 0 if the value is null', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue(null)
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(0)
  })
})
