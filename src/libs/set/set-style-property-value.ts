/**
 * Sets a CSS custom property on the root element.
 *
 * @param key - The name of the CSS custom property to set.
 * @param value - The value to set for the CSS custom property.
 * Does nothing in SSR environments where window is undefined.
 */
export const setStylePropertyValue = (key: string, value: string): void => {
  if (typeof window === 'undefined') return

  document.documentElement.style.setProperty(key, value)
}
