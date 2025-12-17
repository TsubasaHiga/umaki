/**
 * Determines if the browser is currently online.
 *
 * Uses the Navigator.onLine API to check the online status.
 * Note: This only indicates network connectivity, not actual internet access.
 *
 * @returns `true` if the browser is online, `false` if offline.
 *
 * @example
 * ```ts
 * if (isOnline()) {
 *   // Perform network request
 *   fetchData()
 * } else {
 *   // Show offline message
 *   showOfflineMessage()
 * }
 * ```
 */
export const isOnline = (): boolean => {
  if (typeof navigator === 'undefined') {
    return true
  }
  return navigator.onLine
}
