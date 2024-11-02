/**
 * Checks if all elements in the array are non-null.
 *
 * @param elements - An array of HTMLElements or null values.
 * @returns True if all elements are non-null and the array is not empty, otherwise false.
 */
export const isExistAllElements = (
  elements: (HTMLElement | null)[]
): boolean => {
  return elements.length > 0 && elements.every((element) => element !== null)
}
