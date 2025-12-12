/**
 * Retrieves the class names of a given HTML element as an array of strings.
 *
 * @param target - The target HTML element from which to extract class names.
 * @returns An array of class names.
 */
export const getClassNames = (target: HTMLElement): string[] => {
  // listの空配列をフィルター
  const list = String(target.classList)
    .split(' ')
    .filter((v) => v)

  return list
}
