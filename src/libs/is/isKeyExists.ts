/**
 * Checks if a specific key exists in an object.
 *
 * @template T - The type of the object.
 * @template U - The type of the key.
 * @param {T} obj - The object to check.
 * @param {U} key - The key to check for.
 * @returns {obj is T & Record<U, unknown>} - Returns true if the key exists in the object, otherwise false.
 */
export const isKeyExists = <
  T extends Record<string, unknown>,
  U extends string
>(
  obj: T,
  key: U
): obj is T & Record<U, unknown> => {
  return !!obj && Object.hasOwn(obj, key)
}
