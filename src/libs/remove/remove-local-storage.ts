import store from 'store2'

/**
 * Removes an item from local storage.
 *
 * @param key - The key of the item to remove from local storage.
 */
export const removeLocalStorage = (key: string): void => {
  store.local.remove(key)
}
