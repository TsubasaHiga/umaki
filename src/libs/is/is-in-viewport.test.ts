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

  describe('rootMargin percentage calculation (IntersectionObserver spec)', () => {
    // Per W3C spec, percentage values use root width (innerWidth) for all directions
    // @see https://www.w3.org/TR/intersection-observer/#parse-a-margin

    it('should use innerWidth for vertical percentage per IntersectionObserver spec', () => {
      // window.innerWidth = 1024 (set in beforeEach)
      // rootMargin: "10%" means all directions use 1024 * 0.1 = 102.4px

      // Element is 100px above viewport
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: -100,
        left: 100,
        bottom: -50,
        right: 200,
        width: 100,
        height: 50,
        x: 100,
        y: -100,
        toJSON: () => {}
      })

      // Without margin: not visible (top: -100, bottom: -50, viewport top: 0)
      expect(isInViewport(element)).toBe(false)

      // With 10% margin (102.4px based on innerWidth), viewport top becomes -102.4
      // Element bottom (-50) > viewport top (-102.4), so visible
      expect(isInViewport(element, { rootMargin: '10%' })).toBe(true)
    })

    it('should use innerWidth for horizontal percentage in two-value syntax', () => {
      // window.innerWidth = 1024
      // rootMargin: "0px 10%" means:
      // - top/bottom: 0px
      // - left/right: 1024 * 0.1 = 102.4px

      // Element is 80px to the left of viewport
      vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
        top: 100,
        left: -80,
        bottom: 200,
        right: -30,
        width: 50,
        height: 100,
        x: -80,
        y: 100,
        toJSON: () => {}
      })

      // Without margin: not visible (right: -30 < viewport left: 0)
      expect(isInViewport(element)).toBe(false)

      // With 10% horizontal margin (102.4px), viewport left becomes -102.4
      // Element right (-30) > viewport left (-102.4), so visible
      expect(isInViewport(element, { rootMargin: '0px 10%' })).toBe(true)
    })
  })
})
