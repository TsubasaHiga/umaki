/**
 * @vitest-environment jsdom
 */
import { removeAllHtmlTags } from './remove-all-html-tags'

describe('removeAllHtmlTags', () => {
  it('should remove all HTML tags from a string', () => {
    const input = '<p>Hello <strong>World</strong>!</p>'
    const output = 'Hello World!'
    expect(removeAllHtmlTags(input)).toBe(output)
  })

  it('should return an empty string if input is an empty string', () => {
    const input = ''
    const output = ''
    expect(removeAllHtmlTags(input)).toBe(output)
  })

  it('should handle strings with no HTML tags', () => {
    const input = 'Hello World!'
    const output = 'Hello World!'
    expect(removeAllHtmlTags(input)).toBe(output)
  })

  it('should remove nested HTML tags', () => {
    const input = '<div><p>Hello <span>World</span>!</p></div>'
    const output = 'Hello World!'
    expect(removeAllHtmlTags(input)).toBe(output)
  })

  it('should handle self-closing tags', () => {
    const input = 'Hello <br/> World!'
    const output = 'Hello  World!'
    expect(removeAllHtmlTags(input)).toBe(output)
  })

  // DOMPurify returns input without '<' as is, so escaping depends on the input
  it('should escape special characters when the input contains markup', () => {
    expect(removeAllHtmlTags('Tom & Jerry <b>x</b>')).toBe('Tom &amp; Jerry x')
    expect(removeAllHtmlTags('1 < 2')).toBe('1 &lt; 2')
  })

  it('should return the input as is when it contains no "<"', () => {
    expect(removeAllHtmlTags('Tom & Jerry')).toBe('Tom & Jerry')
  })

  it('should not decode entities in the input', () => {
    expect(removeAllHtmlTags('&lt;script&gt;alert(1)&lt;/script&gt;')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;'
    )
  })

  it('should remove script elements with their content', () => {
    expect(removeAllHtmlTags('<script>alert(1)</script>Hello')).toBe('Hello')
  })
})
