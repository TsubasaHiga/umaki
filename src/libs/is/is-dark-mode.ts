/**
 * Checks whether the user prefers a dark color scheme (`(prefers-color-scheme: dark)`).
 *
 * @returns True if the media query matches, false otherwise.
 * Returns false in SSR environments where window is undefined, or when matchMedia is not available.
 */
export const isDarkMode = (): boolean => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
