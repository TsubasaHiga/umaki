/**
 * Checks whether the user prefers reduced motion (`(prefers-reduced-motion: reduce)`).
 *
 * @returns True if the media query matches, false otherwise.
 * Returns false in SSR environments where window is undefined, or when matchMedia is not available.
 */
export const isReducedMotion = (): boolean => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
