import store from 'store2'
import { setSessionStorage } from './set-session-storage'

describe('setSessionStorage', () => {
  beforeEach(() => {
    store.session.clearAll()
  })

  it('should set a value in session storage', () => {
    const key = 'testKey'
    const value = 'testValue'

    setSessionStorage(key, value)

    const storedValue = store.session.get(key)
    expect(storedValue).toBe(value)
  })

  it('should overwrite an existing value in session storage', () => {
    const key = 'testKey'
    const initialValue = 'initialValue'
    const newValue = 'newValue'

    setSessionStorage(key, initialValue)
    setSessionStorage(key, newValue)

    const storedValue = store.session.get(key)
    expect(storedValue).toBe(newValue)
  })

  it('should handle empty string as key', () => {
    const key = ''
    const value = 'testValue'

    setSessionStorage(key, value)

    const storedValue = store.session.get(key)
    expect(storedValue).toBe(value)
  })

  it('should handle empty string as value', () => {
    const key = 'testKey'
    const value = ''

    setSessionStorage(key, value)

    const storedValue = store.session.get(key)
    expect(storedValue).toBe(value)
  })

  it('should store objects, arrays and numbers as JSON', () => {
    setSessionStorage('object', { a: 1, b: [1, 2] })
    setSessionStorage('number', 42)

    expect(sessionStorage.getItem('object')).toBe('{"a":1,"b":[1,2]}')
    expect(store.session.get('object')).toEqual({ a: 1, b: [1, 2] })
    expect(store.session.get('number')).toBe(42)
  })
})
