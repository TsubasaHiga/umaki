/**
 * Sets a CSS variable to 100vh to handle viewport units on mobile devices.
 *
 * This function calculates 1% of the viewport height and sets it as a CSS variable.
 * This is useful for handling issues with viewport units on mobile devices.
 *
 * @param {string} [setProperty='--vh'] - The name of the CSS variable to set.
 *
 * @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
export const set100vh = (setProperty = '--vh'): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty(setProperty, `${vh}px`)
}
