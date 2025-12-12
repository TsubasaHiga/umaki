import store from 'store2'

/**
 * Sets a value in session storage.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to store.
 */
export const setSessionStorage = (key: string, value: string): void => {
  store.session.set(key, value)
}
