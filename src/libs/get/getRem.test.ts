import { getRem } from './getRem'

describe('getRem', () => {
  it('should convert px to rem correctly', () => {
    expect(getRem(16)).toBe('1rem')
    expect(getRem(32)).toBe('2rem')
    expect(getRem(8)).toBe('0.5rem')
  })

  it('should handle zero value', () => {
    expect(getRem(0)).toBe('0rem')
  })

  it('should handle negative values', () => {
    expect(getRem(-16)).toBe('-1rem')
    expect(getRem(-32)).toBe('-2rem')
  })
})
