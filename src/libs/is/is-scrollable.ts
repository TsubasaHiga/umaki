/**
 * Determines if an element is scrollable.
 *
 * @param element - The HTML element to check for scrollability.
 * @returns `true` if the element is scrollable either horizontally or vertically, otherwise `false`.
 */
export const isScrollable = (element: HTMLElement): boolean => {
  // 横スクロールが可能かどうか
  const isScrollableX = element.scrollWidth > element.clientWidth

  // 縦スクロールが可能かどうか
  const isScrollableY = element.scrollHeight > element.clientHeight

  return isScrollableX || isScrollableY
}
