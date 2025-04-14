/**
 * @vitest-environment jsdom
 */
import { htmlSanitize } from './htmlSanitize'

describe('htmlSanitize', () => {
  it('should sanitize HTML string', () => {
    const html = '<script>alert("xss")</script><p>Hello World</p>'
    const sanitized = htmlSanitize(html)
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should handle empty string', () => {
    const html = ''
    const sanitized = htmlSanitize(html)
    expect(sanitized).toBe('')
  })

  it('should handle custom config', () => {
    const html = '<p>Hello World</p>'
    const config = { ALLOWED_TAGS: ['p'] }
    const sanitized = htmlSanitize(html, config)
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should handle HTML with attributes', () => {
    const html = '<p class="test" onclick="alert(1)">Hello World</p>'
    const sanitized = htmlSanitize(html)
    expect(sanitized).toBe('<p class="test">Hello World</p>')
  })
})
