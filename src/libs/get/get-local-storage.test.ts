import store from 'store2'
import { getLocalStorage } from './get-local-storage'

describe('getLocalStorage', () => {
  beforeEach(() => {
    store.local.clearAll()
  })

  it('should return the value associated with the key', () => {
    store.local.set('testKey', 'testValue')
    expect(getLocalStorage('testKey')).toBe('testValue')
  })

  it('should restore objects, arrays and numbers', () => {
    store.local.set('object', { a: 1, b: [1, 2] })
    store.local.set('number', 42)
    expect(getLocalStorage<{ a: number; b: number[] }>('object')).toEqual({
      a: 1,
      b: [1, 2]
    })
    expect(getLocalStorage<number>('number')).toBe(42)
  })

  it('should return null if the key does not exist', () => {
    expect(getLocalStorage('nonExistentKey')).toBeNull()
  })

  it('should return a raw string that is not JSON as is', () => {
    localStorage.setItem('raw', 'not json {')
    expect(getLocalStorage('raw')).toBe('not json {')
  })
})
