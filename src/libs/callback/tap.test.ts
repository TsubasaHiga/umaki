import { tap } from './tap'

describe('tap', () => {
  it('should return the original value unchanged', () => {
    const value = 'hello'
    const result = tap(value, () => {})
    expect(result).toBe(value)
  })

  it('should call the callback with the value', () => {
    const value = 42
    const callback = vi.fn()
    tap(value, callback)
    expect(callback).toHaveBeenCalledWith(value)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should work with objects', () => {
    const value = { name: 'test', count: 1 }
    const callback = vi.fn()
    const result = tap(value, callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with arrays', () => {
    const value = [1, 2, 3]
    const callback = vi.fn()
    const result = tap(value, callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with null', () => {
    const value = null
    const callback = vi.fn()
    const result = tap(value, callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with undefined', () => {
    const value = undefined
    const callback = vi.fn()
    const result = tap(value, callback)
    expect(result).toBe(value)
    expect(callback).toHaveBeenCalledWith(value)
  })

  it('should work with functions (higher-order functions)', () => {
    const fn = () => 'result'
    const callback = vi.fn()
    const result = tap(fn, callback)
    expect(result).toBe(fn)
    expect(callback).toHaveBeenCalledWith(fn)
    expect(result()).toBe('result')
  })

  it('should ignore the callback return value', () => {
    const value = 'original'
    const result = tap(value, () => 'modified')
    expect(result).toBe('original')
  })

  it('should execute callback synchronously', () => {
    const order: number[] = []
    order.push(1)
    tap('value', () => order.push(2))
    order.push(3)
    expect(order).toEqual([1, 2, 3])
  })
})
