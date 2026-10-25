/**
 * @vitest-environment jsdom
 */
import {
  type HtmlSanitizeConfig,
  htmlSanitize,
  sanitizeHtml
} from './html-sanitize'

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

  it('should remove javascript: URLs by default', () => {
    const html = '<a href="javascript:alert(1)">link</a>'
    expect(htmlSanitize(html)).toBe('<a>link</a>')
  })

  it.each([
    ['RETURN_DOM', { RETURN_DOM: true }],
    ['RETURN_DOM_FRAGMENT', { RETURN_DOM_FRAGMENT: true }],
    ['RETURN_TRUSTED_TYPE', { RETURN_TRUSTED_TYPE: true }],
    ['IN_PLACE', { IN_PLACE: true }]
  ])('should always return a string even if %s is set', (_, config) => {
    const html = '<script>alert("xss")</script><p>Hello World</p>'
    // Rejected by the type, but JavaScript callers can still pass it
    const sanitized = htmlSanitize(html, config as HtmlSanitizeConfig)
    expect(typeof sanitized).toBe('string')
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should keep other options when string output options are overridden', () => {
    const html = '<p>Hello <b>World</b></p>'
    const sanitized = htmlSanitize(html, {
      ALLOWED_TAGS: ['p'],
      // @ts-expect-error RETURN_DOM is not accepted by the type
      RETURN_DOM: true
    })
    expect(sanitized).toBe('<p>Hello World</p>')
  })

  it('should reject options that are ignored at the type level', () => {
    expectTypeOf<HtmlSanitizeConfig>().not.toHaveProperty('RETURN_DOM')
    expectTypeOf<HtmlSanitizeConfig>().not.toHaveProperty('RETURN_DOM_FRAGMENT')
    expectTypeOf<HtmlSanitizeConfig>().not.toHaveProperty('RETURN_TRUSTED_TYPE')
    expectTypeOf<HtmlSanitizeConfig>().not.toHaveProperty('IN_PLACE')
    expectTypeOf<HtmlSanitizeConfig>().toHaveProperty('ALLOWED_TAGS')
  })
})

describe('sanitizeHtml (alias)', () => {
  it('should be an alias for htmlSanitize', () => {
    expect(sanitizeHtml).toBe(htmlSanitize)
  })

  it('should sanitize HTML string', () => {
    const html = '<script>alert("xss")</script><p>Hello World</p>'
    const sanitized = sanitizeHtml(html)
    expect(sanitized).toBe('<p>Hello World</p>')
  })
})
