/**
 * Awaits a Promise, executes a callback with the resolved value, and returns the original value.
 * Useful for performing side effects (logging, caching, analytics, etc.) on async values without modifying them.
 *
 * @param promise - The Promise to await.
 * @param callback - A function that receives the resolved value. Its return value is ignored.
 * @returns A Promise that resolves to the original value.
 *
 * @example
 * ```ts
 * import { tapAsync } from 'umaki'
 *
 * // Logging async results
 * const data = await tapAsync(fetchData(), (result) => {
 *   console.log('Fetched:', result)
 * })
 * ```
 *
 * @example
 * ```ts
 * // Caching async results
 * const getData = () => tapAsync(
 *   fetchFromServer(),
 *   (data) => cache.set('data', data)
 * )
 * ```
 *
 * @example
 * ```ts
 * // Parallel execution with individual completion tracking
 * await Promise.all([
 *   tapAsync(fetchUserData(), (user) => console.log('user loaded')),
 *   tapAsync(fetchProductData(), (products) => console.log('products loaded')),
 *   tapAsync(fetchOrderData(), (orders) => console.log('orders loaded'))
 * ])
 * ```
 *
 * @example
 * ```ts
 * // Event emission on async completion
 * const loadUser = () => tapAsync(
 *   fetchUser(),
 *   (user) => eventEmitter.emit('userLoaded', user)
 * )
 * ```
 */
export const tapAsync = async <T>(
  promise: Promise<T>,
  callback: (value: T) => void
): Promise<T> => {
  const value = await promise
  callback(value)
  return value
}
