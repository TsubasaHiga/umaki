import { sleep } from './sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should resolve after the specified time in seconds', async () => {
    const onResolve = vi.fn()
    sleep(1).then(onResolve)

    await vi.advanceTimersByTimeAsync(999)
    expect(onResolve).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(onResolve).toHaveBeenCalledOnce()
  })

  it('should support fractional seconds', async () => {
    const onResolve = vi.fn()
    sleep(0.25).then(onResolve)

    await vi.advanceTimersByTimeAsync(249)
    expect(onResolve).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(1)
    expect(onResolve).toHaveBeenCalledOnce()
  })

  it('should resolve to undefined', async () => {
    const promise = sleep(0)
    await vi.advanceTimersByTimeAsync(0)
    await expect(promise).resolves.toBeUndefined()
  })
})
