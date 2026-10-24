import store from 'store2'
import { setLocalStorage } from './set-local-storage'

describe('setLocalStorage', () => {
  beforeEach(() => {
    store.local.clearAll()
  })

  it('should store a string value', () => {
    setLocalStorage('testKey', 'testValue')
    expect(store.local.get('testKey')).toBe('testValue')
  })

  it('should store an object as JSON', () => {
    setLocalStorage('object', { a: 1 })
    expect(localStorage.getItem('object')).toBe('{"a":1}')
    expect(store.local.get('object')).toEqual({ a: 1 })
  })

  it('should overwrite an existing value', () => {
    setLocalStorage('testKey', 'first')
    setLocalStorage('testKey', 'second')
    expect(store.local.get('testKey')).toBe('second')
  })
})
