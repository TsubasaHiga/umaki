/**
 * Retrieves the value of a CSS custom property.
 *
 * @param key - The name of the CSS custom property to retrieve.
 * @returns The value of the specified CSS custom property.
 * Returns an empty string in SSR environments where window is undefined.
 */
export const getStylePropertyValue = (key: string): string => {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement).getPropertyValue(key)
}
