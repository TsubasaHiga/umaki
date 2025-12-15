/**
 * Sets an attribute on a given HTML element.
 *
 * @param element - The HTML element on which the attribute will be set.
 * @param attribute - The name of the attribute to set.
 * @param value - The value of the attribute to set.
 */
export const setAttribute = (
  element: HTMLElement,
  attribute: string,
  value: string
): void => {
  element.setAttribute(attribute, value)
}
