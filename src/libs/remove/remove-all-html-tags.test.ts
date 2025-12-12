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
})
