import { isDarkMode } from './is-dark-mode'

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

describe('isDarkMode', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return true when the media query matches', () => {
    const spy = mockMatchMedia('(prefers-color-scheme: dark)')
    expect(isDarkMode()).toBe(true)
    expect(spy).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
  })

  it('should return false when the media query does not match', () => {
    mockMatchMedia('(other)')
    expect(isDarkMode()).toBe(false)
  })

  it('should return false when matchMedia is not available', () => {
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error - Simulating an environment without matchMedia
    delete window.matchMedia
    expect(isDarkMode()).toBe(false)
    window.matchMedia = originalMatchMedia
  })

  it('should return false in SSR environment (window undefined)', () => {
    const originalWindow = global.window
    // @ts-expect-error - Simulating SSR environment
    delete global.window
    expect(isDarkMode()).toBe(false)
    global.window = originalWindow
  })
})
