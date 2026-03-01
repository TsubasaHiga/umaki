import { getOrientation } from './get-orientation'

describe('getOrientation', () => {
  it('should return "landscape" when the orientation is landscape', () => {
    // Mock window.matchMedia to return landscape
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(orientation: landscape)',
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    expect(getOrientation()).toBe('landscape')
  })

  it('should return "portrait" when the orientation is portrait', () => {
    // Mock window.matchMedia to return portrait
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: query === '(orientation: portrait)',
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }))

    expect(getOrientation()).toBe('portrait')
  })

  it('should return "portrait" in SSR environment (window undefined)', () => {
    const originalWindow = global.window
    // @ts-expect-error - Simulating SSR environment
    delete global.window

    expect(getOrientation()).toBe('portrait')

    global.window = originalWindow
  })
})
