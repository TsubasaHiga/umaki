import store from 'store2'

/**
 * Removes an item from local storage.
 *
 * @param key - The key of the item to remove from local storage.
 * In SSR environments where window is undefined, this does nothing (store2 would otherwise keep values in memory shared across requests).
 */
export const removeLocalStorage = (key: string): void => {
  if (typeof window === 'undefined') return

  store.local.remove(key)
}
