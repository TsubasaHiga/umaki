import store from 'store2'
import { getSessionStorage } from './get-session-storage'

describe('getSessionStorage', () => {
  beforeEach(() => {
    store.session.clearAll()
  })

  it('should return the value associated with the key', () => {
    store.session.set('testKey', 'testValue')
    const result = getSessionStorage('testKey')
    expect(result).toBe('testValue')
  })

  it('should return null if the key does not exist', () => {
    const result = getSessionStorage('nonExistentKey')
    expect(result).toBeNull()
  })

  it('should return null if the value is undefined', () => {
    store.session.set('undefinedKey', undefined)
    const result = getSessionStorage('undefinedKey')
    expect(result).toBe('undefined')
  })

  it('should restore objects, arrays and numbers', () => {
    store.session.set('object', { a: 1, b: [1, 2] })
    store.session.set('number', 42)
    expect(getSessionStorage<{ a: number; b: number[] }>('object')).toEqual({
      a: 1,
      b: [1, 2]
    })
    expect(getSessionStorage<number>('number')).toBe(42)
  })

  it('should type the result as unknown by default and as T | null with a type argument', () => {
    expectTypeOf(getSessionStorage('key')).toEqualTypeOf<unknown>()
    expectTypeOf(getSessionStorage<number>('key')).toEqualTypeOf<
      number | null
    >()
  })
})
