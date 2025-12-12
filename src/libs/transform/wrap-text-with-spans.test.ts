import { wrapTextWithSpans } from './wrap-text-with-spans'

describe('wrapTextWithSpans', () => {
  it('should wrap each character of a text node in a span', () => {
    const div = document.createElement('div') as unknown as HTMLElement
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
    const div = document.createElement('div') as unknown as HTMLElement
    div.textContent = ''
    wrapTextWithSpans(div)

    expect(div.childNodes.length).toBe(0)
  })

  it('should recursively wrap text nodes in child elements', () => {
    const div = document.createElement('div') as unknown as HTMLElement
    div.innerHTML = '<p>hello</p><p>world</p>'
    wrapTextWithSpans(div)

    const paragraphs = div.querySelectorAll('p')
    expect(paragraphs[0].childNodes.length).toBe(5)
    expect(paragraphs[1].childNodes.length).toBe(5)
    expect(paragraphs[0].childNodes[0].nodeName).toBe('SPAN')
    expect(paragraphs[1].childNodes[0].nodeName).toBe('SPAN')
  })

  it('should not modify non-text nodes', () => {
    const div = document.createElement('div') as unknown as HTMLElement
    const span = document.createElement('span') as unknown as HTMLElement
    div.appendChild(span)
    wrapTextWithSpans(div)

    expect(div.childNodes[0].nodeName).toBe('SPAN')
    expect(div.childNodes[0].childNodes.length).toBe(0)
  })
})
