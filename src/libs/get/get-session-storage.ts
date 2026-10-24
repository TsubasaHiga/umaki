import store from 'store2'

/**
 * Retrieves the session storage value associated with the given key.
 *
 * @param key - The key of the session storage item to retrieve.
 * @returns The value associated with the key, or null if the key does not exist.
 * In SSR environments where window is undefined, null is returned (store2 would otherwise keep values in memory shared across requests).
 */
export const getSessionStorage = (key: string): unknown => {
  if (typeof window === 'undefined') return null

  // valueを取得
  const value = store.session.get(key)

  // valueがundefinedの場合はnullを返す
  if (value === undefined) return null

  return value
}
