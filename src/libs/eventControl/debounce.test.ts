import { debounce } from './debounce'

describe('debounce', () => {
  vi.useFakeTimers()

  it('should call the function after the specified delay', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 200)

    debouncedFn()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalled()
  })

  it('should call the function with the correct arguments', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 200)

    debouncedFn('arg1', 'arg2')
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it('should reset the delay if called again within the delay period', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 200)

    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()
    vi.advanceTimersByTime(100)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalled()
  })

  it('should handle multiple calls correctly', () => {
    const fn = vi.fn()
    const debouncedFn = debounce(fn, 200)

    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()
    vi.advanceTimersByTime(100)
    debouncedFn()
    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
