import { sleep } from './sleep'

describe('sleep', () => {
  it('should resolve after the specified time', async () => {
    const start = Date.now()
    await sleep(1) // sleep for 1 second
    const end = Date.now()
    const duration = (end - start) / 1000 // convert to seconds

    expect(duration).toBeGreaterThanOrEqual(1)
    expect(duration).toBeLessThan(1.1) // allow some margin for timing inaccuracies
  })
})
