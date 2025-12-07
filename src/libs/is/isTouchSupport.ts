/**
 * Determines if the device supports touch input.
 *
 * @returns {boolean} True if the device supports touch input, otherwise false.
 */
export const isTouchSupport = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return false

  // Check if the window object has the ontouchstart event
  const hasTouchStart =
    'ontouchstart' in window && window.ontouchstart !== undefined

  // Check for touch points in the navigator object (most modern approach)
  const hasTouchPoints =
    typeof navigator !== 'undefined' &&
    typeof navigator.maxTouchPoints === 'number' &&
    navigator.maxTouchPoints > 0

  // Check for MS-specific touch points (for legacy IE/Edge)
  const hasMsTouchPoints =
    typeof navigator !== 'undefined' &&
    // We need to use type assertion since msMaxTouchPoints is not in standard Navigator type
    typeof (navigator as Navigator & { msMaxTouchPoints?: number })
      .msMaxTouchPoints === 'number' &&
    (navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints! >
      0

  return hasTouchStart || hasTouchPoints || hasMsTouchPoints
}
