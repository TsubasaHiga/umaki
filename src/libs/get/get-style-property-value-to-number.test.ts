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

  it('should return decimal values correctly', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('1.5')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(1.5)
  })

  it('should return decimal values from values with units (e.g., px)', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('2.75px')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(2.75)
  })

  it('should return decimal values from values with units (e.g., rem)', () => {
    ;(getStylePropertyValue as Mock).mockReturnValue('3.14rem')
    const result = getStylePropertyValueToNumber('--custom-property')
    expect(result).toBe(3.14)
  })
})
