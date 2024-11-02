import { scrollToHash } from './scrollToHash'

describe('scrollToHash', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div style="height: 1000px;"></div>
      <div id="target" style="height: 100px;"></div>
    `
    window.scrollTo = vi.fn()
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

    // #targetの位置をtargetElementPosYにする
    Object.defineProperty(
      document.getElementById('target'),
      'getBoundingClientRect',
      {
        value: () => ({ top: targetElementPosY })
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
    window.scrollTo = vi.fn().mockImplementation(() => {
      window.scrollY = -1
    })
    const result = await scrollToHash('#target')
    expect(result).toBe(false)
  })
})
