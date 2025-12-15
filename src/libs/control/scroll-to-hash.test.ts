import { scrollToHash } from './scroll-to-hash'

describe('scrollToHash', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div style="height: 1000px;"></div>
      <div id="target" style="height: 100px;"></div>
    `
    window.scrollTo = vi.fn()
    // Reset scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })
  })

  it('should scroll to the target element with smooth behavior', async () => {
    const result = await scrollToHash('#target')
    expect(result).toBe(true)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    })
  })

  it('should scroll to the target element with instant behavior', async () => {
    const result = await scrollToHash('#target', false)
    expect(result).toBe(true)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'instant'
    })
  })

  it('should return false if the target element does not exist', async () => {
    const result = await scrollToHash('#nonexistent')
    expect(result).toBe(false)
    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('should apply manual offset if provided', async () => {
    const targetElementPosY = 100

    Object.defineProperty(
      document.getElementById('target'),
      'getBoundingClientRect',
      {
        value: () => ({ top: targetElementPosY }),
        configurable: true
      }
    )

    const result = await scrollToHash('#target', true, targetElementPosY)
    expect(result).toBe(true)
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    })
  })

  it('should resolve false if scroll does not reach the target within 1 second', async () => {
    vi.useFakeTimers()

    const targetElement = document.getElementById('target')
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => ({ top: 500 }),
      configurable: true
    })
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })
    // scrollTo does not change scrollY, so timeout will trigger
    window.scrollTo = vi.fn()

    const promise = scrollToHash('#target')

    // Advance timers to trigger the 1 second timeout
    await vi.advanceTimersByTimeAsync(1000)

    const result = await promise
    expect(result).toBe(false)

    vi.useRealTimers()
  })

  it('should handle hash without # prefix', async () => {
    const result = await scrollToHash('target')
    expect(result).toBe(true)
    expect(window.scrollTo).toHaveBeenCalled()
  })

  it('should resolve true immediately when already at target position', async () => {
    const targetElement = document.getElementById('target')
    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => ({ top: 0 }),
      configurable: true
    })
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })

    const result = await scrollToHash('#target')
    expect(result).toBe(true)
  })

  it('should resolve true when scroll reaches target position via scroll event', async () => {
    const targetElement = document.getElementById('target')
    const targetPosY = 500

    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => ({ top: targetPosY }),
      configurable: true
    })
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })

    window.scrollTo = vi.fn().mockImplementation(() => {
      // Simulate scroll completing
      Object.defineProperty(window, 'scrollY', {
        value: targetPosY,
        writable: true,
        configurable: true
      })
      window.dispatchEvent(new Event('scroll'))
    })

    const result = await scrollToHash('#target')
    expect(result).toBe(true)
  })

  it('should handle scroll event with position not yet at target', async () => {
    vi.useFakeTimers()

    const targetElement = document.getElementById('target')
    const targetPosY = 500

    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => ({ top: targetPosY }),
      configurable: true
    })
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true
    })

    window.scrollTo = vi.fn()

    const promise = scrollToHash('#target')

    // Dispatch scroll event while not yet at target
    window.dispatchEvent(new Event('scroll'))

    // Still not at target, should not resolve yet
    // Advance time but not enough for timeout
    await vi.advanceTimersByTimeAsync(500)

    // Now set scrollY to target and dispatch scroll
    Object.defineProperty(window, 'scrollY', {
      value: targetPosY,
      writable: true,
      configurable: true
    })
    window.dispatchEvent(new Event('scroll'))

    const result = await promise
    expect(result).toBe(true)

    vi.useRealTimers()
  })

  it('should use zero offset when manualOffset is not provided', async () => {
    const targetElement = document.getElementById('target')
    const targetPosY = 100

    Object.defineProperty(targetElement, 'getBoundingClientRect', {
      value: () => ({ top: targetPosY }),
      configurable: true
    })

    await scrollToHash('#target')

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: targetPosY,
      behavior: 'smooth'
    })
  })
})
