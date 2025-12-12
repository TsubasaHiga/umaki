import { isScrollable } from './is-scrollable'

describe('isScrollable', () => {
  it('should return true for an element that is scrollable horizontally', () => {
    const element = document.createElement('div') as unknown as HTMLElement
    element.style.width = '100px'
    element.style.overflowX = 'auto'
    element.innerHTML = '<div style="width: 200px;"></div>'
    document.body.appendChild(element)

    // Mock scrollWidth and clientWidth
    Object.defineProperty(element, 'scrollWidth', {
      value: 200,
      configurable: true
    })
    Object.defineProperty(element, 'clientWidth', {
      value: 100,
      configurable: true
    })

    expect(isScrollable(element)).toBe(true)
  })

  it('should return true for an element that is scrollable vertically', () => {
    const element = document.createElement('div') as unknown as HTMLElement
    element.style.height = '100px'
    element.style.overflowY = 'auto'
    element.innerHTML = '<div style="height: 200px;"></div>'
    document.body.appendChild(element)

    // Mock scrollHeight and clientHeight
    Object.defineProperty(element, 'scrollHeight', {
      value: 200,
      configurable: true
    })
    Object.defineProperty(element, 'clientHeight', {
      value: 100,
      configurable: true
    })

    expect(isScrollable(element)).toBe(true)
  })

  it('should return false for an element that is not scrollable', () => {
    const element = document.createElement('div') as unknown as HTMLElement
    element.style.width = '100px'
    element.style.height = '100px'
    element.innerHTML = '<div style="width: 50px; height: 50px;"></div>'
    document.body.appendChild(element)

    // Mock scrollWidth, clientWidth, scrollHeight, and clientHeight
    Object.defineProperty(element, 'scrollWidth', {
      value: 50,
      configurable: true
    })
    Object.defineProperty(element, 'clientWidth', {
      value: 100,
      configurable: true
    })
    Object.defineProperty(element, 'scrollHeight', {
      value: 50,
      configurable: true
    })
    Object.defineProperty(element, 'clientHeight', {
      value: 100,
      configurable: true
    })

    expect(isScrollable(element)).toBe(false)
  })
})
