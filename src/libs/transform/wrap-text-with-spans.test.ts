import { wrapTextWithSpans } from './wrap-text-with-spans'

describe('wrapTextWithSpans', () => {
  it('should wrap each character of a text node in a span', () => {
    const div = document.createElement('div')
    div.textContent = 'hello'
    wrapTextWithSpans(div)

    expect(div.childNodes.length).toBe(5)
    expect(div.childNodes[0].nodeName).toBe('SPAN')
    expect(div.childNodes[0].textContent).toBe('h')
    expect(div.childNodes[1].textContent).toBe('e')
    expect(div.childNodes[2].textContent).toBe('l')
    expect(div.childNodes[3].textContent).toBe('l')
    expect(div.childNodes[4].textContent).toBe('o')
  })

  it('should handle empty text nodes', () => {
    const div = document.createElement('div')
    div.textContent = ''
    wrapTextWithSpans(div)

    expect(div.childNodes.length).toBe(0)
  })

  it('should recursively wrap text nodes in child elements', () => {
    const div = document.createElement('div')
    div.innerHTML = '<p>hello</p><p>world</p>'
    wrapTextWithSpans(div)

    const paragraphs = div.querySelectorAll('p')
    expect(paragraphs[0].childNodes.length).toBe(5)
    expect(paragraphs[1].childNodes.length).toBe(5)
    expect(paragraphs[0].childNodes[0].nodeName).toBe('SPAN')
    expect(paragraphs[1].childNodes[0].nodeName).toBe('SPAN')
  })

  it('should not modify non-text nodes', () => {
    const div = document.createElement('div')
    const span = document.createElement('span')
    div.appendChild(span)
    wrapTextWithSpans(div)

    expect(div.childNodes[0].nodeName).toBe('SPAN')
    expect(div.childNodes[0].childNodes.length).toBe(0)
  })

  it('should return early if element is null', () => {
    // Should not throw an error
    expect(() =>
      wrapTextWithSpans(null as unknown as HTMLElement)
    ).not.toThrow()
  })

  it('should return early if element is undefined', () => {
    // Should not throw an error
    expect(() =>
      wrapTextWithSpans(undefined as unknown as HTMLElement)
    ).not.toThrow()
  })

  it('should handle text node passed directly', () => {
    const div = document.createElement('div')
    div.textContent = 'test'
    const textNode = div.childNodes[0] as unknown as HTMLElement

    // Wrap the text node directly
    wrapTextWithSpans(textNode)

    // After wrapping, the div should contain spans
    expect(div.childNodes.length).toBe(4)
    expect(div.childNodes[0].nodeName).toBe('SPAN')
    expect(div.childNodes[0].textContent).toBe('t')
  })

  it('should handle whitespace-only text content', () => {
    const div = document.createElement('div')
    div.textContent = '   '
    wrapTextWithSpans(div)

    // Trimmed text is empty, so no spans
    expect(div.childNodes.length).toBe(0)
  })

  it('should handle text with leading/trailing whitespace', () => {
    const div = document.createElement('div')
    div.textContent = '  hi  '
    wrapTextWithSpans(div)

    // Trimmed text is 'hi', so 2 spans
    expect(div.childNodes.length).toBe(2)
    expect(div.childNodes[0].textContent).toBe('h')
    expect(div.childNodes[1].textContent).toBe('i')
  })

  it('should handle nested elements with mixed content', () => {
    const div = document.createElement('div')
    div.innerHTML = '<span>ab</span>cd<span>ef</span>'
    wrapTextWithSpans(div)

    // First span contains 'ab' -> 2 spans
    const firstSpan = div.childNodes[0] as HTMLElement
    expect(firstSpan.childNodes.length).toBe(2)

    // Middle text node 'cd' -> 2 spans
    expect(div.childNodes[1].nodeName).toBe('SPAN')
    expect(div.childNodes[1].textContent).toBe('c')
    expect(div.childNodes[2].nodeName).toBe('SPAN')
    expect(div.childNodes[2].textContent).toBe('d')

    // Last span contains 'ef' -> 2 spans
    const lastSpan = div.childNodes[3] as HTMLElement
    expect(lastSpan.childNodes.length).toBe(2)
  })

  it('should handle comment nodes without modification', () => {
    const div = document.createElement('div')
    div.innerHTML = '<!-- comment -->text'
    wrapTextWithSpans(div)

    // Comment node should still be there (nodeType 8)
    expect(div.childNodes[0].nodeType).toBe(Node.COMMENT_NODE)
    // Text should be wrapped
    expect(div.childNodes[1].nodeName).toBe('SPAN')
  })

  it('should handle unicode characters', () => {
    const div = document.createElement('div')
    div.textContent = '日本語'
    wrapTextWithSpans(div)

    expect(div.childNodes.length).toBe(3)
    expect(div.childNodes[0].textContent).toBe('日')
    expect(div.childNodes[1].textContent).toBe('本')
    expect(div.childNodes[2].textContent).toBe('語')
  })

  it('should handle emoji characters', () => {
    const div = document.createElement('div')
    div.textContent = '👍🎉'
    wrapTextWithSpans(div)

    // Emoji are handled as characters by for...of
    expect(div.childNodes.length).toBe(2)
    expect(div.childNodes[0].textContent).toBe('👍')
    expect(div.childNodes[1].textContent).toBe('🎉')
  })
})
