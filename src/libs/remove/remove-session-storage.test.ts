import store from 'store2'
import { removeSessionStorage } from './remove-session-storage'

describe('removeSessionStorage', () => {
  const key = 'testKey'
  const value = 'testValue'

  beforeEach(() => {
    // Set up the session storage with a test key-value pair
    store.session.set(key, value)
  })

  it('should remove the item from session storage', () => {
    // Ensure the item is in session storage before removal
    expect(store.session.get(key)).toBe(value)

    // Call the function to remove the item
    removeSessionStorage(key)

    // Ensure the item is removed from session storage
    expect(store.session.get(key)).toBeNull()
  })

  it('should not throw an error if the key does not exist', () => {
    const nonExistentKey = 'nonExistentKey'

    // Ensure the non-existent key is not in session storage
    expect(store.session.get(nonExistentKey)).toBeNull()

    // Call the function to remove the non-existent key
    expect(() => removeSessionStorage(nonExistentKey)).not.toThrow()
  })
})
