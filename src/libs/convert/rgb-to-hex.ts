const sanitizeComponent = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.min(255, Math.round(value)))
}

const toHexPair = (value: number): string =>
  sanitizeComponent(value).toString(16).padStart(2, '0')

/**
 * Converts RGB color components to a 6-digit hex color string with leading `#`.
 *
 * Each component is rounded to the nearest integer and clamped to `[0, 255]`.
 * Non-finite values (`NaN`, `Infinity`, `-Infinity`) are treated as `0`.
 *
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Lowercase hex color string (e.g. `#ff0000`)
 */
export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`
