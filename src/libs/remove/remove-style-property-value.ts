/**
 * Removes a CSS custom property from the root element.
 *
 * @param key - The name of the CSS custom property to remove.
 * Does nothing in SSR environments where window is undefined.
 */
export const removeStylePropertyValue = (key: string): void => {
  if (typeof window === 'undefined') return

  document.documentElement.style.removeProperty(key)
}
