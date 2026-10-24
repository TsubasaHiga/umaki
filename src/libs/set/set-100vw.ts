/**
 * Sets a CSS variable to the value of 100vw (excluding the scrollbar width).
 *
 * @param setProperty - The name of the CSS variable to set. Defaults to '--vw'.
 * Does nothing in SSR environments where window is undefined.
 */
export const set100vw = (setProperty = '--vw'): void => {
  if (typeof window === 'undefined') return

  const vw = document.documentElement.clientWidth
  document.documentElement.style.setProperty(setProperty, `${vw}px`)
}
