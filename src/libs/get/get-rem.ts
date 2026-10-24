/**
 * Converts a pixel value to rem units.
 * Calculates based on the actual root font size of the document.
 *
 * @param px - The pixel value to be converted.
 * @returns The equivalent value in rem units as a string.
 * Uses the browser default root font size (16px) in SSR environments where window is undefined.
 */
export const getRem = (px: number): string => {
  if (typeof window === 'undefined') return `${px / 16}rem`

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )
  return `${px / rootFontSize}rem`
}
