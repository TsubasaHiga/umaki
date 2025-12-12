import { getGravatarUrl } from './get-gravatar-url'

describe('getGravatarUrl', () => {
  it('should return correct Gravatar URL for a given email and size', () => {
    const email = 'test@example.com'
    const size = 80
    const result = getGravatarUrl(email, size)

    // MD5 hash of 'test@example.com' is '55502f40dc8b7c769880b10874abc9d0'
    const expectedUrl =
      'https://www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=80&d=404'
    expect(result).toBe(expectedUrl)
  })

  it('should handle different email addresses correctly', () => {
    const email = 'user@domain.org'
    const size = 100
    const result = getGravatarUrl(email, size)

    // MD5 hash of 'user@domain.org' is '640f8c96cd7de424a8248a15d8b19b4d'
    const expectedUrl =
      'https://www.gravatar.com/avatar/640f8c96cd7de424a8248a15d8b19b4d?s=100&d=404'
    expect(result).toBe(expectedUrl)
  })

  it('should handle different sizes correctly', () => {
    const email = 'hello@world.com'
    const size = 200
    const result = getGravatarUrl(email, size)

    // MD5 hash of 'hello@world.com' is '4b3cdf9adfc6258a102ab90eb64565ea'
    const expectedUrl =
      'https://www.gravatar.com/avatar/4b3cdf9adfc6258a102ab90eb64565ea?s=200&d=404'
    expect(result).toBe(expectedUrl)
  })

  it('should handle empty email correctly', () => {
    const email = ''
    const size = 80
    const result = getGravatarUrl(email, size)

    // MD5 hash of empty string is 'd41d8cd98f00b204e9800998ecf8427e'
    const expectedUrl =
      'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=404'
    expect(result).toBe(expectedUrl)
  })

  it('should handle email with uppercase letters correctly', () => {
    const email = 'TEST@EXAMPLE.COM'
    const size = 150
    const result = getGravatarUrl(email, size)

    // Email should be normalized to lowercase, so MD5 hash should be same as 'test@example.com'
    const expectedUrl =
      'https://www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=150&d=404'
    expect(result).toBe(expectedUrl)
  })

  it('should trim whitespace from email addresses', () => {
    const email = '  test@example.com  '
    const size = 80
    const result = getGravatarUrl(email, size)

    // Should produce same hash as trimmed 'test@example.com'
    const expectedUrl =
      'https://www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=80&d=404'
    expect(result).toBe(expectedUrl)
  })
})
