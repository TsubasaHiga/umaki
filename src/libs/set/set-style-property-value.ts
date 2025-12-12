/**
 * Sets a CSS custom property on the root element.
 *
 * @param key - The name of the CSS custom property to set.
 * @param value - The value to set for the CSS custom property.
 */
export const setStylePropertyValue = (key: string, value: string): void => {
  document.documentElement.style.setProperty(key, value)
}
