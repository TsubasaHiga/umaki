/**
 * Recursively retrieves the parent elements of a given HTMLElement and returns them in an array.
 *
 * @param element - The HTMLElement for which to retrieve the parent elements.
 * @returns An array of HTMLElements representing the parent elements of the given element.
 */
export const getParentList = (element: HTMLElement): HTMLElement[] => {
  const parentElement = element.parentElement
  if (!parentElement) return [element]
  return [element].concat(getParentList(parentElement))
}
