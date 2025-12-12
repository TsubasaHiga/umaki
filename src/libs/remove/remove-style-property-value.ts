/**
 * Removes a CSS custom property from the root element.
 *
 * @param key - The name of the CSS custom property to remove.
 */
export const removeStylePropertyValue = (key: string): void => {
  document.documentElement.style.removeProperty(key)
}
