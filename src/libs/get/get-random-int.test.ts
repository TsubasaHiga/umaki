import { getRandomInt } from './get-random-int'

describe('getRandomInt', () => {
  it('should return an integer within the specified range', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(1, 10)
      expect(result).toBeGreaterThanOrEqual(1)
      expect(result).toBeLessThanOrEqual(10)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should return the same value when min equals max', () => {
    expect(getRandomInt(5, 5)).toBe(5)
    expect(getRandomInt(0, 0)).toBe(0)
    expect(getRandomInt(-3, -3)).toBe(-3)
  })

  it('should work with negative numbers', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(-10, -1)
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(-1)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should work with a range spanning negative to positive', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(-5, 5)
      expect(result).toBeGreaterThanOrEqual(-5)
      expect(result).toBeLessThanOrEqual(5)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should throw an error when min is greater than max', () => {
    expect(() => getRandomInt(10, 1)).toThrow(
      'min must be less than or equal to max'
    )
  })

  it('should handle decimal inputs by flooring max and ceiling min', () => {
    for (let i = 0; i < 100; i++) {
      const result = getRandomInt(1.2, 9.8)
      expect(result).toBeGreaterThanOrEqual(2)
      expect(result).toBeLessThanOrEqual(9)
      expect(Number.isInteger(result)).toBe(true)
    }
  })

  it('should throw when no integer exists between min and max', () => {
    expect(() => getRandomInt(1.2, 1.8)).toThrow(
      'No integer exists between min and max'
    )
  })

  it('should return the only integer in a decimal range', () => {
    for (let i = 0; i < 20; i++) {
      expect(getRandomInt(0.5, 1.5)).toBe(1)
    }
  })

  it.each([
    [Number.NaN, 1],
    [1, Number.NaN],
    [0, Number.POSITIVE_INFINITY],
    [Number.NEGATIVE_INFINITY, 0]
  ])('should throw for non-finite input (%s, %s)', (min, max) => {
    expect(() => getRandomInt(min, max)).toThrow(
      'min and max must be finite numbers'
    )
  })
})
