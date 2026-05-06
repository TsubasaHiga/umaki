import { hexToRgb } from './hex-to-rgb'

describe('hexToRgb', () => {
  describe('valid input', () => {
    it('converts a 6-digit hex string with leading #', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
      expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
      expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
    })

    it('converts a 6-digit hex string without leading #', () => {
      expect(hexToRgb('ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('converts a 3-digit hex string by expanding each digit', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 })
      expect(hexToRgb('#abc')).toEqual({ r: 170, g: 187, b: 204 })
    })

    it('converts a 3-digit hex string without leading #', () => {
      expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 })
    })

    it('is case-insensitive', () => {
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 })
      expect(hexToRgb('#FfAa00')).toEqual({ r: 255, g: 170, b: 0 })
    })

    it('trims surrounding whitespace', () => {
      expect(hexToRgb('  #ff0000  ')).toEqual({ r: 255, g: 0, b: 0 })
    })

    it('handles boundary values', () => {
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 })
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 })
    })
  })

  describe('invalid input', () => {
    it('returns undefined for an empty string', () => {
      expect(hexToRgb('')).toBeUndefined()
    })

    it('returns undefined for a string containing only #', () => {
      expect(hexToRgb('#')).toBeUndefined()
    })

    it('returns undefined for unsupported lengths', () => {
      expect(hexToRgb('#f')).toBeUndefined()
      expect(hexToRgb('#ff')).toBeUndefined()
      expect(hexToRgb('#ffff')).toBeUndefined()
      expect(hexToRgb('#fffff')).toBeUndefined()
      expect(hexToRgb('#fffffff')).toBeUndefined()
      expect(hexToRgb('#ffffffff')).toBeUndefined()
    })

    it('returns undefined when non-hex characters are present', () => {
      expect(hexToRgb('#gggggg')).toBeUndefined()
      expect(hexToRgb('#zz0000')).toBeUndefined()
      expect(hexToRgb('#ff 000')).toBeUndefined()
    })

    it('returns undefined for invalid input without leading #', () => {
      expect(hexToRgb('ggg')).toBeUndefined()
      expect(hexToRgb('ff')).toBeUndefined()
      expect(hexToRgb('fffffff')).toBeUndefined()
    })
  })

  describe('case-insensitive without leading #', () => {
    it('handles uppercase 3-digit hex', () => {
      expect(hexToRgb('ABC')).toEqual({ r: 170, g: 187, b: 204 })
    })

    it('handles mixed-case 6-digit hex', () => {
      expect(hexToRgb('FfAa00')).toEqual({ r: 255, g: 170, b: 0 })
    })
  })
})
