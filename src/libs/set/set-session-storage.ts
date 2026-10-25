import store from 'store2'

/**
 * Sets a value in session storage.
 *
 * The value is saved as JSON, so objects, arrays and numbers can be stored as well as strings.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to store.
 * In SSR environments where window is undefined, nothing is stored (store2 would otherwise keep values in memory shared across requests).
 */
export const setSessionStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return

  store.session.set(key, value)
}
