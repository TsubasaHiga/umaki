import store from 'store2'
import { getSessionStorage } from './getSessionStorage'

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
})
