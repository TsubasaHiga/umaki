import { getRem } from './getRem'

describe('getRem', () => {
  beforeEach(() => {
    document.documentElement.style.fontSize = '16px'
  })

  afterEach(() => {
    document.documentElement.style.fontSize = ''
  })

  it('should convert px to rem correctly with default 16px root font size', () => {
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

  it('should calculate rem based on actual root font size', () => {
    document.documentElement.style.fontSize = '10px'
    expect(getRem(10)).toBe('1rem')
    expect(getRem(20)).toBe('2rem')
    expect(getRem(5)).toBe('0.5rem')
  })

  it('should calculate rem correctly with 20px root font size', () => {
    document.documentElement.style.fontSize = '20px'
    expect(getRem(20)).toBe('1rem')
    expect(getRem(40)).toBe('2rem')
    expect(getRem(10)).toBe('0.5rem')
  })
})
