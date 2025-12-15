/**
 * Sets the horizontal scroll position of a root element to center a target element within it.
 *
 * @param rootElement - The root HTML element whose scroll position will be adjusted.
 * @param targetElement - The target HTML element that should be centered within the root element.
 * @param behavior - The scrolling behavior, either 'auto' or 'smooth'. Defaults to 'smooth'.
 */
export const setScrollPositionToCenter = (
  rootElement: HTMLElement,
  targetElement: HTMLElement,
  behavior: 'auto' | 'smooth' = 'smooth'
): void => {
  const rootHalfW = rootElement.getBoundingClientRect().width / 2
  const targetHalfW = targetElement.getBoundingClientRect().width / 2
  const currentPosLeft = targetElement.offsetLeft + targetHalfW
  const posLeft = currentPosLeft - rootHalfW

  rootElement.scrollTo({ left: posLeft, behavior: behavior })
}
