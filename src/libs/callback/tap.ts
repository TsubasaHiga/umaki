/**
 * Type that excludes Promise types.
 * Used to prevent passing async values to synchronous tap function.
 */
type NotPromise<T> = T extends Promise<unknown> ? never : T

/**
 * Executes a callback with the given value and returns the original value unchanged.
 * Useful for performing side effects (logging, analytics, etc.) in a pipeline without modifying the value.
 *
 * @param value - The value to pass to the callback. Must not be a Promise (use tapAsync for async values).
 * @param callback - A function that receives the value. Its return value is ignored.
 * @returns The original value unchanged.
 *
 * @example
 * ```ts
 * import { tap, removeAllHtmlTags } from 'umaki'
 *
 * const input = '<p>Hello <strong>World</strong>!</p>'
 * const output = tap(removeAllHtmlTags(input), (result) => {
 *   console.log('Sanitized:', result)
 * })
 * // Logs: 'Sanitized: Hello World!'
 * // output = 'Hello World!'
 * ```
 *
 * @example
 * ```ts
 * // Caching example
 * const data = tap(processData(raw), (result) => {
 *   cache.set('processed', result)
 * })
 * ```
 */
export const tap = <T>(
  value: NotPromise<T>,
  callback: (value: T) => void
): T => {
  callback(value as T)
  return value as T
}
