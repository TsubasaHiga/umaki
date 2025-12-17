/**
 * Copies the specified text to the clipboard.
 *
 * Uses the modern Clipboard API (navigator.clipboard.writeText).
 * Returns a promise that resolves to true on success, false on failure.
 *
 * @param text - The text to copy to the clipboard.
 * @returns A promise that resolves to `true` if the copy was successful, `false` otherwise.
 *
 * @example
 * ```ts
 * // Basic usage
 * const success = await copyToClipboard('Hello, World!')
 * if (success) {
 *   console.log('Copied to clipboard!')
 * } else {
 *   console.log('Failed to copy')
 * }
 *
 * // With async/await error handling
 * try {
 *   await copyToClipboard('Some text')
 * } catch (error) {
 *   console.error('Copy failed:', error)
 * }
 * ```
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
