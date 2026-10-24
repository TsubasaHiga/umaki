import store from 'store2'

/**
 * Removes an item from session storage.
 *
 * @param key - The key of the item to remove from session storage.
 * In SSR environments where window is undefined, this does nothing (store2 would otherwise keep values in memory shared across requests).
 */
export const removeSessionStorage = (key: string): void => {
  if (typeof window === 'undefined') return

  store.session.remove(key)
}
