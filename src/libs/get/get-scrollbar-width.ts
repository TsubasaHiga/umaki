/**
 * Retrieves the width of the scrollbar.
 *
 * Uses document.documentElement.clientWidth instead of document.body.clientWidth
 * to ensure accurate measurement regardless of body element styling (e.g., max-width, margin).
 *
 * @returns {number} The width of the scrollbar in pixels.
 */
export const getScrollbarWidth = (): number =>
  window.innerWidth - document.documentElement.clientWidth
