import store from 'store2'

/**
 * Sets a value in local storage.
 *
 * The value is saved as JSON, so objects, arrays and numbers can be stored as well as strings.
 *
 * @param key - The key under which the value is stored.
 * @param value - The value to store.
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  store.local.set(key, value)
}
