import { getStringLength } from './getStringLength'

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
})
