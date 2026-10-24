/**
 * Retrieves the height of the document.
 *
 * @returns {number} The height of the document, calculated as the difference between the body's client height and the window's inner height.
 * Returns 0 in SSR environments where window is undefined.
 */
export const getDocumentHeight = (): number => {
  if (typeof window === 'undefined') return 0
  return document.body.clientHeight - window.innerHeight
}
