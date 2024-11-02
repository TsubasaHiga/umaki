/**
 * Sets a CSS variable to the value of 100vw (excluding the scrollbar width).
 *
 * @param setProperty - The name of the CSS variable to set. Defaults to '--vw'.
 */
export const set100vw = (setProperty = '--vw'): void => {
  const vw = document.documentElement.clientWidth
  document.documentElement.style.setProperty(setProperty, `${vw}px`)
}
