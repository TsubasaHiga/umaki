import { truncate } from './truncate'

describe('truncate', () => {
  it('should truncate and append the default omission', () => {
    expect(truncate('Hello, world!', 8)).toBe('Hello...')
  })

  it('should use a custom omission', () => {
    expect(truncate('Hello, world!', 8, '…')).toBe('Hello, …')
    expect(truncate('Hello, world!', 8, '')).toBe('Hello, w')
  })

  it('should return the string as is when it is not longer than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
    expect(truncate('Hello', 5)).toBe('Hello')
    expect(truncate('', 0)).toBe('')
  })

  it('should truncate when the string is one character longer than maxLength', () => {
    expect(truncate('Hello!', 5)).toBe('He...')
  })

  it('should not split emojis or combined characters', () => {
    expect(truncate('👨‍👩‍👧‍👦👍🏻🇯🇵abc', 4, '…')).toBe('👨‍👩‍👧‍👦👍🏻🇯🇵…')
    expect(truncate('がぎぐげご', 3, '…')).toBe('がぎ…')
  })

  it('should not split combining characters', () => {
    expect(truncate('e\u0301abc', 2, '…')).toBe('e\u0301…')
    expect(truncate('か\u3099き\u3099く\u3099', 2, '…')).toBe('か\u3099…')
    expect(truncate('abcdef', 2, 'e\u0301')).toBe('ae\u0301')
  })

  it('should count the omission in grapheme clusters', () => {
    expect(truncate('abcdefgh', 5, '👉🏻')).toBe('abcd👉🏻')
  })

  it('should cut the omission when maxLength is shorter than it', () => {
    expect(truncate('Hello, world!', 3)).toBe('...')
    expect(truncate('Hello, world!', 2)).toBe('..')
    expect(truncate('Hello, world!', 0)).toBe('')
  })

  it('should throw if maxLength is not a non-negative integer', () => {
    expect(() => truncate('Hello', -1)).toThrow()
    expect(() => truncate('Hello', 1.5)).toThrow()
    expect(() => truncate('Hello', Number.NaN)).toThrow()
    expect(() => truncate('Hello', Number.POSITIVE_INFINITY)).toThrow()
  })
})
