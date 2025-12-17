import { isOnline } from './is-online'

describe('isOnline', () => {
  const originalNavigator = global.navigator

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true
    })
  })

  it('should return true when navigator.onLine is true', () => {
    Object.defineProperty(global, 'navigator', {
      value: { onLine: true },
      writable: true,
      configurable: true
    })

    expect(isOnline()).toBe(true)
  })

  it('should return false when navigator.onLine is false', () => {
    Object.defineProperty(global, 'navigator', {
      value: { onLine: false },
      writable: true,
      configurable: true
    })

    expect(isOnline()).toBe(false)
  })

  it('should return true when navigator is undefined (SSR)', () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true
    })

    expect(isOnline()).toBe(true)
  })
})
