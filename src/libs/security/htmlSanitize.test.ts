/**
 * @vitest-environment jsdom
 */
import { sanitizeHtml } from './htmlSanitize'

describe('sanitizeHtml', () => {
  it('should sanitize HTML string', () => {
    const html = '<script>alert("xss")</script><p>Hello World</p>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should handle empty string', () => {
    const html = ''
    const sanitized = sanitizeHtml(html)
    expect(sanitized).toBe('')
  })

  it('should handle custom config', () => {
    const html = '<p>Hello World</p>'
    const config = { ALLOWED_TAGS: ['p'] }
    const sanitized = sanitizeHtml(html, config)
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should handle HTML with attributes', () => {
    const html = '<p class="test" onclick="alert(1)">Hello World</p>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).toBe('<p class="test">Hello World</p>')
  })
})
