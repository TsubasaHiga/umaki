import { runes } from 'runes2'

/**
 * Wraps each grapheme cluster (visual character) of the text content of an HTML element with individual <span> elements.
 *
 * @param element - The HTML element whose text content will be wrapped with <span> elements.
 *
 * This function recursively processes the given element and its child nodes. If the node is a text node,
 * it replaces the text content with a series of <span> elements, each containing a single grapheme cluster from the text.
 * If the node is an element node, it recursively processes its child nodes.
 *
 * This function correctly handles:
 * - Composite emojis (e.g., 👨‍👩‍👧‍👦, 👍🏻)
 * - Flag emojis (e.g., 🇯🇵)
 * - Combined characters
 */
export const wrapTextWithSpans = (element: HTMLElement): void => {
  if (!element) return

  if (element.nodeType === Node.TEXT_NODE) {
    const textContent = (element.textContent || '').trim()
    const fragment = document.createDocumentFragment()
    // Use runes to properly split text into grapheme clusters
    const graphemes = runes(textContent)
    for (const grapheme of graphemes) {
      const span = document.createElement('span')
      span.textContent = grapheme
      fragment.appendChild(span)
    }
    element.replaceWith(fragment)
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    for (const child of Array.from(element.childNodes)) {
      wrapTextWithSpans(child as HTMLElement)
    }
  }
}
