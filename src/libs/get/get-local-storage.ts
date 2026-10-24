import store from 'store2'

/**
 * Retrieves the local storage value associated with the given key.
 *
 * Values saved with `setLocalStorage` are restored from JSON, so objects and numbers keep their type.
 * The type parameter is not checked at runtime.
 *
 * @param key - The key of the local storage item to retrieve.
 * @returns The value associated with the key, or null if the key does not exist.
 * In SSR environments where window is undefined, null is returned (store2 would otherwise keep values in memory shared across requests).
 */
export const getLocalStorage = <T = unknown>(key: string): T | null => {
  if (typeof window === 'undefined') return null

  const value = store.local.get(key)
  if (value === undefined || value === null) return null

  return value as T
}
