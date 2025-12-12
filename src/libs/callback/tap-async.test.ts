import { tapAsync } from './tap-async'

describe('tapAsync', () => {
  it('should return the resolved value unchanged', async () => {
    const value = 'hello'
    const result = await tapAsync(Promise.resolve(value), () => {})
    expect(result).toBe(value)
  })

  it('should call the callback with the resolved value', async () => {
    const value = 42
    const callback = vi.fn()
    await tapAsync(Promise.resolve(value), callback)
    expect(callback).toHaveBeenCalledWith(value)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should work with objects', async () => {
    const value = { name: 'test', count: 1 }
    const callback = vi.fn()
    const result = await tapAsync(Promise.resolve(value), callback)
    expect(result).toEqual(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with arrays', async () => {
    const value = [1, 2, 3]
    const callback = vi.fn()
    const result = await tapAsync(Promise.resolve(value), callback)
    expect(result).toEqual(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with null', async () => {
    const value = null
    const callback = vi.fn()
    const result = await tapAsync(Promise.resolve(value), callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with undefined', async () => {
    const value = undefined
    const callback = vi.fn()
    const result = await tapAsync(Promise.resolve(value), callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should ignore the callback return value', async () => {
    const value = 'original'
    const result = await tapAsync(Promise.resolve(value), () => 'modified')
    expect(result).toBe('original')
  })

  it('should execute callback after promise resolves', async () => {
    const order: number[] = []
    order.push(1)

    const promise = new Promise<string>((resolve) => {
      setTimeout(() => {
        order.push(2)
        resolve('value')
      }, 10)
    })

    await tapAsync(promise, () => order.push(3))
    order.push(4)

    expect(order).toEqual([1, 2, 3, 4])
  })

  it('should work with Promise.all for parallel execution', async () => {
    const results: string[] = []

    const promise1 = new Promise<string>((resolve) => {
      setTimeout(() => resolve('first'), 30)
    })
    const promise2 = new Promise<string>((resolve) => {
      setTimeout(() => resolve('second'), 10)
    })
    const promise3 = new Promise<string>((resolve) => {
      setTimeout(() => resolve('third'), 20)
    })

    const [r1, r2, r3] = await Promise.all([
      tapAsync(promise1, (v) => results.push(v)),
      tapAsync(promise2, (v) => results.push(v)),
      tapAsync(promise3, (v) => results.push(v))
    ])

    expect(r1).toBe('first')
    expect(r2).toBe('second')
    expect(r3).toBe('third')
    // Callbacks are called in order of resolution, not declaration
    expect(results).toEqual(['second', 'third', 'first'])
  })

  it('should propagate errors from the promise', async () => {
    const error = new Error('test error')
    const callback = vi.fn()

    await expect(tapAsync(Promise.reject(error), callback)).rejects.toThrow(
      'test error'
    )

    expect(callback).not.toHaveBeenCalled()
  })

  it('should handle async delay correctly', async () => {
    const delay = (ms: number) =>
      new Promise<number>((resolve) => setTimeout(() => resolve(ms), ms))

    const callback = vi.fn()
    const result = await tapAsync(delay(50), callback)

    expect(result).toBe(50)
    expect(callback).toHaveBeenCalledWith(50)
  })
})
