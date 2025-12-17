import { isInViewport } from './is-in-viewport'

describe('isInViewport', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768
    })
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  describe('basic visibility', () => {
    it('should return true when element is fully visible', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: 100,
        bottom: 200,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: () => {}
      })

      expect(isInViewport(element)).toBe(true)
    })

    it('should return true when element is partially visible at top', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -50,
        left: 100,
        bottom: 50,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: -50,
        toJSON: () => {}
      })

      expect(isInViewport(element)).toBe(true)
    })

    it('should return false when element is completely above viewport', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -200,
        left: 100,
        bottom: -100,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: -200,
        toJSON: () => {}
      })

      expect(isInViewport(element)).toBe(false)
    })

    it('should return false when element is completely below viewport', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 800,
        left: 100,
        bottom: 900,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 800,
        toJSON: () => {}
      })

      expect(isInViewport(element)).toBe(false)
    })
  })

  describe('threshold option', () => {
    it('should return true when element is fully visible with threshold 1', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: 100,
        bottom: 200,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: 100,
        toJSON: () => {}
      })

      expect(isInViewport(element, { threshold: 1 })).toBe(true)
    })

    it('should return false when element is partially visible with threshold 1', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -50,
        left: 100,
        bottom: 50,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: -50,
        toJSON: () => {}
      })

      expect(isInViewport(element, { threshold: 1 })).toBe(false)
    })

    it('should return true when more than 50% is visible with threshold 0.5', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -40,
        left: 100,
        bottom: 60,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: -40,
        toJSON: () => {}
      })

      expect(isInViewport(element, { threshold: 0.5 })).toBe(true)
    })

    it('should return false when less than 50% is visible with threshold 0.5', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -60,
        left: 100,
        bottom: 40,
        right: 200,
        width: 100,
        height: 100,
        x: 100,
        y: -60,
        toJSON: () => {}
      })

      expect(isInViewport(element, { threshold: 0.5 })).toBe(false)
    })
  })

  describe('rootMargin option', () => {
    it('should expand viewport bounds with positive rootMargin', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -50,
        left: 100,
        bottom: -10,
        right: 200,
        width: 100,
        height: 40,
        x: 100,
        y: -50,
        toJSON: () => {}
      })

      expect(isInViewport(element)).toBe(false)
      expect(isInViewport(element, { rootMargin: '100px' })).toBe(true)
    })

    it('should handle two-value rootMargin', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -50,
        left: 100,
        bottom: -10,
        right: 200,
        width: 100,
        height: 40,
        x: 100,
        y: -50,
        toJSON: () => {}
      })

      expect(isInViewport(element, { rootMargin: '100px 0px' })).toBe(true)
    })

    it('should handle four-value rootMargin', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -50,
        left: 100,
        bottom: -10,
        right: 200,
        width: 100,
        height: 40,
        x: 100,
        y: -50,
        toJSON: () => {}
      })

      expect(isInViewport(element, { rootMargin: '100px 0px 0px 0px' })).toBe(
        true
      )
    })
  })

  describe('edge cases', () => {
    it('should return false for zero-size elements with threshold > 0', () => {
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: 100,
        bottom: 100,
        right: 100,
        width: 0,
        height: 0,
        x: 100,
        y: 100,
        toJSON: () => {}
      })

      expect(isInViewport(element, { threshold: 0.5 })).toBe(false)
    })
  })
})
