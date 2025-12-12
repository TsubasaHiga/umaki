import { getGcd } from './get-gcd'

/**
 * Returns the aspect ratio of the given width and height.
 *
 * @param w - The width value.
 * @param h - The height value.
 * @returns An object containing the width and height of the aspect ratio.
 */
export const getAspectRatio = (
  w: number,
  h: number
): { w: number; h: number } => {
  const gcd = getGcd(w, h)
  return { w: w / gcd, h: h / gcd }
}
