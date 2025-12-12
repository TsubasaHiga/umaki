/**
 * Retrieves the height of the document.
 *
 * @returns {number} The height of the document, calculated as the difference between the body's client height and the window's inner height.
 */
export const getDocumentHeight = (): number =>
  document.body.clientHeight - window.innerHeight
