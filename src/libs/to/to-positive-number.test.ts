import { toPositiveNumber } from './to-positive-number'

describe('toPositiveNumber', () => {
  it('should return the same number if it is positive', () => {
    expect(toPositiveNumber(5)).toBe(5)
  })

  it('should return the absolute value if the number is negative', () => {
    expect(toPositiveNumber(-5)).toBe(5)
  })

  it('should return 0 if the number is 0', () => {
    expect(toPositiveNumber(0)).toBe(0)
  })

  it('should return the absolute value for negative decimal numbers', () => {
    expect(toPositiveNumber(-3.14)).toBe(3.14)
  })

  it('should return the same number for positive decimal numbers', () => {
    expect(toPositiveNumber(3.14)).toBe(3.14)
  })
})
