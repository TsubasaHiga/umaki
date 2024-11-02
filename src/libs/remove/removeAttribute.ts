/**
 * Removes the specified attribute from the given HTML element.
 *
 * @param element - The HTML element from which the attribute will be removed.
 * @param attribute - The name of the attribute to be removed.
 */
export const removeAttribute = (element: HTMLElement, attribute: string) => {
  element.removeAttribute(attribute)
}
