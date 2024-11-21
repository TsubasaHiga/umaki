import { throttle } from './throttle'

describe('throttle', () => {
  it('should call the function immediately if not called recently', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 1000)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call the function again if called within the delay period', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 1000)

    throttledFn()
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the function again if called after the delay period', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const throttledFn = throttle(fn, 1000)

    throttledFn()
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(1000)
    throttledFn()
    expect(fn).toHaveBeenCalledTimes(2)

    vi.useRealTimers()
  })

  it('should pass the correct arguments to the function', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 1000)

    throttledFn(1, 2, 3)
    expect(fn).toHaveBeenCalledWith(1, 2, 3)
  })
})
