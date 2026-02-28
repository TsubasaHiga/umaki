import { getGcd } from './get-gcd'

/**
 * Returns the aspect ratio of the given width and height.
 *
 * @param w - The width value. Must be a positive number.
 * @param h - The height value. Must be a positive number.
 * @returns An object containing the width and height of the aspect ratio.
 * @throws {Error} If width or height is not a positive number.
 */
export const getAspectRatio = (
  w: number,
  h: number
): { w: number; h: number } => {
  if (w <= 0 || h <= 0 || !Number.isFinite(w) || !Number.isFinite(h)) {
    throw new Error('Width and height must be positive finite numbers')
  }
  const gcd = getGcd(w, h)
  return { w: w / gcd, h: h / gcd }
}
