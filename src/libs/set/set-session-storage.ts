import store from 'store2'

/**
 * Sets a value in session storage.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to store.
 * In SSR environments where window is undefined, nothing is stored (store2 would otherwise keep values in memory shared across requests).
 */
export const setSessionStorage = (key: string, value: string): void => {
  if (typeof window === 'undefined') return

  store.session.set(key, value)
}
