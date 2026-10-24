import { isReducedMotion } from './is-reduced-motion'

const mockMatchMedia = (matchingQuery: string) =>
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query === matchingQuery,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))

describe('isReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return true when the media query matches', () => {
    const spy = mockMatchMedia('(prefers-reduced-motion: reduce)')
    expect(isReducedMotion()).toBe(true)
    expect(spy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
  })

  it('should return false when the media query does not match', () => {
    mockMatchMedia('(other)')
    expect(isReducedMotion()).toBe(false)
  })

  it('should return false when matchMedia is not available', () => {
    const originalMatchMedia = window.matchMedia
    try {
      // @ts-expect-error - Simulating an environment without matchMedia
      delete window.matchMedia
      expect(isReducedMotion()).toBe(false)
    } finally {
      window.matchMedia = originalMatchMedia
    }
  })

  it('should return false in SSR environment (window undefined)', () => {
    const originalWindow = global.window
    try {
      // @ts-expect-error - Simulating SSR environment
      delete global.window
      expect(isReducedMotion()).toBe(false)
    } finally {
      global.window = originalWindow
    }
  })
})
