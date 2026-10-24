import { getGcd } from './get-gcd'

describe('getGcd', () => {
  it('should return the gcd of two positive numbers', () => {
    expect(getGcd(48, 18)).toBe(6)
    expect(getGcd(56, 98)).toBe(14)
  })

  it('should return the gcd when one number is zero', () => {
    expect(getGcd(0, 5)).toBe(5)
    expect(getGcd(7, 0)).toBe(7)
  })

  it('should return the number itself when both numbers are the same', () => {
    expect(getGcd(7, 7)).toBe(7)
    expect(getGcd(100, 100)).toBe(100)
  })

  it('should return the gcd of two negative numbers', () => {
    expect(getGcd(-48, -18)).toBe(6)
    expect(getGcd(-56, -98)).toBe(14)
  })

  it('should return the gcd of a positive and a negative number', () => {
    expect(getGcd(48, -18)).toBe(6)
    expect(getGcd(-56, 98)).toBe(14)
  })

  it.each([
    [Number.NaN, 1],
    [1, Number.NaN],
    [Number.POSITIVE_INFINITY, 1],
    [1, Number.NEGATIVE_INFINITY]
  ])('should throw for non-finite input (%s, %s)', (a, b) => {
    expect(() => getGcd(a, b)).toThrow('Arguments must be finite numbers')
  })

  it('should handle decimal numbers without infinite recursion', () => {
    expect(getGcd(1.5, 0.5)).toBe(0.5)
  })
})
