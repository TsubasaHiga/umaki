import { getStringLength } from './get-string-length'

describe('getStringLength', () => {
  it('should return the correct length for a simple string', () => {
    const result = getStringLength('hello')
    expect(result).toBe(5)
  })

  it('should return the correct length for a string with spaces', () => {
    const result = getStringLength('hello world')
    expect(result).toBe(11)
  })

  it('should return the correct length for a string with Unicode characters', () => {
    const result = getStringLength('こんにちは')
    expect(result).toBe(5)
  })

  it('should return the correct length for a string with emojis', () => {
    const result = getStringLength('hello 🌍')
    expect(result).toBe(7)
  })

  it('should return the correct length for an empty string', () => {
    const result = getStringLength('')
    expect(result).toBe(0)
  })

  it('should return the correct length for a string with mixed characters', () => {
    const result = getStringLength('hello こんにちは 🌍')
    expect(result).toBe(13)
  })

  it('should count composite emojis as one character', () => {
    expect(getStringLength('👨‍👩‍👧‍👦👍🏻🇯🇵')).toBe(3)
  })

  it('should count combining characters as one character', () => {
    expect(getStringLength('e\u0301')).toBe(1)
    expect(getStringLength('か\u3099き\u3099')).toBe(2)
    expect(getStringLength('अनुच्छेद')).toBe(4)
  })

  it('should count CRLF as one character', () => {
    expect(getStringLength('a\r\nb')).toBe(3)
  })
})
