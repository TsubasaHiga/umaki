import store from 'store2'
import { removeLocalStorage } from './remove-local-storage'

describe('removeLocalStorage', () => {
  beforeEach(() => {
    store.local.clearAll()
  })

  it('should remove the item with the given key', () => {
    store.local.set('testKey', 'testValue')
    store.local.set('otherKey', 'otherValue')
    removeLocalStorage('testKey')
    expect(localStorage.getItem('testKey')).toBeNull()
    expect(store.local.get('otherKey')).toBe('otherValue')
  })

  it('should not throw if the key does not exist', () => {
    expect(() => removeLocalStorage('nonExistentKey')).not.toThrow()
  })
})
