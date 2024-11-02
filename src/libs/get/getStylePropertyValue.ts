/**
 * Retrieves the value of a CSS custom property.
 *
 * @param key - The name of the CSS custom property to retrieve.
 * @returns The value of the specified CSS custom property.
 */
export const getStylePropertyValue = (key: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(key)
