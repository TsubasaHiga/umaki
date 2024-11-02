/**
 * Converts a pixel value to rem units.
 *
 * @param px - The pixel value to be converted.
 * @returns The equivalent value in rem units as a string.
 */
export const getRem = (px: number): string => {
  const baseFontSize = 16
  return `${px / baseFontSize}rem`
}
