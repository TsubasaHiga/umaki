/**
 * RGB color components in 0-255 range.
 */
export interface RgbColor {
  r: number
  g: number
  b: number
}

const HEX_PATTERN = /^[0-9a-fA-F]+$/

/**
 * Converts a hex color string to an RGB color object.
 * Supports `#RGB`, `#RRGGBB` and the same forms without the leading `#`.
 *
 * @param hex - Hex color string (e.g. `#fff`, `#ff0000`, `ff0000`)
 * @returns RGB color object, or `undefined` if the input is not a valid hex color string.
 */
export const hexToRgb = (hex: string): RgbColor | undefined => {
  const trimmed = hex.trim()
  const normalized = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed

  if (!HEX_PATTERN.test(normalized)) return undefined

  let expanded: string
  if (normalized.length === 3) {
    expanded = `${normalized[0]}${normalized[0]}${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}`
  } else if (normalized.length === 6) {
    expanded = normalized
  } else {
    return undefined
  }

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16)
  }
}
