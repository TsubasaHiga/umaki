interface IsInViewportOptions {
  /**
   * Threshold for how much of the element must be visible (0-1).
   * 0 = any part visible, 1 = entire element visible.
   * @default 0
   */
  threshold?: number
  /**
   * Root margin to expand or shrink the viewport bounds.
   * Uses CSS-like syntax (e.g., "10px", "10px 20px", "10% 20px 30px 40px").
   * @default "0px"
   */
  rootMargin?: string
}

interface Margins {
  top: number
  right: number
  bottom: number
  left: number
}

/**
 * Parses a CSS-like margin string into margin values.
 */
const parseRootMargin = (rootMargin: string): Margins => {
  const parts = rootMargin.trim().split(/\s+/)
  const parseValue = (value: string): number => {
    if (value.endsWith('%')) {
      const percent = Number.parseFloat(value) / 100
      return window.innerHeight * percent
    }
    return Number.parseFloat(value) || 0
  }

  if (parts.length === 1) {
    const value = parseValue(parts[0])
    return { top: value, right: value, bottom: value, left: value }
  }
  if (parts.length === 2) {
    const vertical = parseValue(parts[0])
    const horizontal = parseValue(parts[1])
    return {
      top: vertical,
      right: horizontal,
      bottom: vertical,
      left: horizontal
    }
  }
  if (parts.length === 3) {
    return {
      top: parseValue(parts[0]),
      right: parseValue(parts[1]),
      bottom: parseValue(parts[2]),
      left: parseValue(parts[1])
    }
  }
  return {
    top: parseValue(parts[0]),
    right: parseValue(parts[1]),
    bottom: parseValue(parts[2]),
    left: parseValue(parts[3])
  }
}

/**
 * Determines if an element is currently visible within the viewport.
 *
 * @param element - The HTML element to check.
 * @param options - Configuration options for the viewport check.
 * @returns `true` if the element is visible in the viewport according to the options, otherwise `false`.
 *
 * @example
 * ```ts
 * // Check if any part of the element is visible
 * isInViewport(element) // true if any part is visible
 *
 * // Check if the entire element is visible
 * isInViewport(element, { threshold: 1 }) // true only if fully visible
 *
 * // Check with expanded viewport bounds (trigger earlier)
 * isInViewport(element, { rootMargin: '100px' }) // 100px buffer around viewport
 *
 * // Check if at least 50% of the element is visible
 * isInViewport(element, { threshold: 0.5 })
 * ```
 */
export const isInViewport = (
  element: HTMLElement,
  options: IsInViewportOptions = {}
): boolean => {
  const { threshold = 0, rootMargin = '0px' } = options

  const rect = element.getBoundingClientRect()
  const margins = parseRootMargin(rootMargin)

  const viewportTop = 0 - margins.top
  const viewportLeft = 0 - margins.left
  const viewportBottom = window.innerHeight + margins.bottom
  const viewportRight = window.innerWidth + margins.right

  if (threshold === 0) {
    return (
      rect.bottom > viewportTop &&
      rect.right > viewportLeft &&
      rect.top < viewportBottom &&
      rect.left < viewportRight
    )
  }

  const elementHeight = rect.height
  const elementWidth = rect.width

  const visibleTop = Math.max(rect.top, viewportTop)
  const visibleBottom = Math.min(rect.bottom, viewportBottom)
  const visibleLeft = Math.max(rect.left, viewportLeft)
  const visibleRight = Math.min(rect.right, viewportRight)

  const visibleHeight = Math.max(0, visibleBottom - visibleTop)
  const visibleWidth = Math.max(0, visibleRight - visibleLeft)

  const visibleArea = visibleHeight * visibleWidth
  const elementArea = elementHeight * elementWidth

  if (elementArea === 0) return false

  const visibleRatio = visibleArea / elementArea

  return visibleRatio >= threshold
}
