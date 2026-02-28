import { getScrollbarWidth } from './get-scrollbar-width'

describe('getScrollbarWidth', () => {
  const originalInnerWidth = window.innerWidth

  beforeEach(() => {
    // Reset to original value before each test
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      writable: true,
      configurable: true
    })
  })

  it('should return the correct scrollbar width using documentElement', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
      configurable: true
    })

    // Mock documentElement.clientWidth to simulate scrollbar
    const originalClientWidth = document.documentElement.clientWidth
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1009,
      configurable: true
    })

    expect(getScrollbarWidth()).toBe(15)

    // Restore
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: originalClientWidth,
      configurable: true
    })
  })

  it('should return 0 when no scrollbar is present', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
      configurable: true
    })

    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 1024,
      configurable: true
    })

    expect(getScrollbarWidth()).toBe(0)
  })
})
