/**
 * Retrieves the width of the scrollbar.
 *
 * @returns {number} The width of the scrollbar in pixels.
 */
export const getScrollbarWidth = (): number =>
  window.innerWidth - document.body.clientWidth
