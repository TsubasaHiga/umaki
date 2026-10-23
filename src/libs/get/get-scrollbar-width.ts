/**
 * Retrieves the width of the scrollbar.
 *
 * Uses document.documentElement.clientWidth instead of document.body.clientWidth
 * to ensure accurate measurement regardless of body element styling (e.g., max-width, margin).
 *
 * @returns {number} The width of the scrollbar in pixels.
 * Returns 0 in SSR environments where window is undefined.
 */
export const getScrollbarWidth = (): number => {
  if (typeof window === 'undefined') return 0
  return window.innerWidth - document.documentElement.clientWidth
}
