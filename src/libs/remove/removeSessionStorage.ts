import store from 'store2'

/**
 * Removes an item from session storage.
 *
 * @param key - The key of the item to remove from session storage.
 */
export const removeSessionStorage = (key: string): void => {
  store.session.remove(key)
}
