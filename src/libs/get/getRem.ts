/**
 * Converts a pixel value to rem units.
 * Calculates based on the actual root font size of the document.
 *
 * @param px - The pixel value to be converted.
 * @returns The equivalent value in rem units as a string.
 */
export const getRem = (px: number): string => {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )
  return `${px / rootFontSize}rem`
}
