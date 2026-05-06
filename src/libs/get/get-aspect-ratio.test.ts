import { getAspectRatio } from './get-aspect-ratio'

describe('getAspectRatio', () => {
  it('should return the correct aspect ratio for 1920x1080', () => {
    const result = getAspectRatio(1920, 1080)
    expect(result).toEqual({ w: 16, h: 9 })
  })

  it('should return the correct aspect ratio for 1280x720', () => {
    const result = getAspectRatio(1280, 720)
    expect(result).toEqual({ w: 16, h: 9 })
  })

  it('should return the correct aspect ratio for 1024x768', () => {
    const result = getAspectRatio(1024, 768)
    expect(result).toEqual({ w: 4, h: 3 })
  })

  it('should return the correct aspect ratio for 800x600', () => {
    const result = getAspectRatio(800, 600)
    expect(result).toEqual({ w: 4, h: 3 })
  })

  it('should return the correct aspect ratio for 1x1', () => {
    const result = getAspectRatio(1, 1)
    expect(result).toEqual({ w: 1, h: 1 })
  })

  it('should throw error for zero width', () => {
    expect(() => getAspectRatio(0, 100)).toThrow(
      'Width and height must be positive finite numbers'
    )
  })

  it('should throw error for zero height', () => {
    expect(() => getAspectRatio(100, 0)).toThrow(
      'Width and height must be positive finite numbers'
    )
  })

  it('should throw error for negative values', () => {
    expect(() => getAspectRatio(-16, 9)).toThrow(
      'Width and height must be positive finite numbers'
    )
    expect(() => getAspectRatio(16, -9)).toThrow(
      'Width and height must be positive finite numbers'
    )
  })

  it('should throw error for NaN', () => {
    expect(() => getAspectRatio(NaN, 100)).toThrow(
      'Width and height must be positive finite numbers'
    )
  })

  it('should throw error for Infinity', () => {
    expect(() => getAspectRatio(Infinity, 100)).toThrow(
      'Width and height must be positive finite numbers'
    )
  })
})
