import store from 'store2'

/**
 * Retrieves the session storage value associated with the given key.
 *
 * @param key - The key of the session storage item to retrieve.
 * @returns The value associated with the key, or null if the key does not exist.
 */
export const getSessionStorage = (key: string): unknown => {
  // valueを取得
  const value = store.session.get(key)

  // valueがundefinedの場合はnullを返す
  if (value === undefined) return null

  return value
}
