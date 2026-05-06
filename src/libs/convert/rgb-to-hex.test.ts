import { rgbToHex } from './rgb-to-hex'

describe('rgbToHex', () => {
  describe('valid input', () => {
    it('converts primary colors', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
      expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
      expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
    })

    it('converts black and white boundaries', () => {
      expect(rgbToHex(0, 0, 0)).toBe('#000000')
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff')
    })

    it('zero-pads single-digit hex values', () => {
      expect(rgbToHex(1, 2, 3)).toBe('#010203')
      expect(rgbToHex(15, 15, 15)).toBe('#0f0f0f')
    })

    it('returns lowercase hex digits', () => {
      expect(rgbToHex(170, 187, 204)).toBe('#aabbcc')
    })

    it('rounds non-integer values to the nearest integer', () => {
      expect(rgbToHex(0.4, 0.5, 0.6)).toBe('#000101')
      expect(rgbToHex(254.5, 254.4, 254.6)).toBe('#fffeff')
    })
  })

  describe('out-of-range and non-finite input', () => {
    it('clamps values above 255 to 255', () => {
      expect(rgbToHex(300, 1000, 256)).toBe('#ffffff')
    })

    it('clamps negative values to 0', () => {
      expect(rgbToHex(-1, -100, -255)).toBe('#000000')
    })

    it('treats NaN as 0', () => {
      expect(rgbToHex(Number.NaN, Number.NaN, Number.NaN)).toBe('#000000')
    })

    it('treats Infinity and -Infinity as 0', () => {
      expect(
        rgbToHex(
          Number.POSITIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
          Number.POSITIVE_INFINITY
        )
      ).toBe('#000000')
    })

    it('handles a mix of valid and invalid components', () => {
      expect(rgbToHex(255, Number.NaN, 128)).toBe('#ff0080')
    })
  })
})
