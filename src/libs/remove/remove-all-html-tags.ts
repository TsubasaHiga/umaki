import DOMPurify from 'isomorphic-dompurify'

/**
 * Removes all HTML tags from the given string.
 *
 * The result is an HTML string, not plain text: when the input contains `<`,
 * special characters are escaped (e.g. `&` becomes `&amp;`); otherwise the input is returned as is.
 * It is safe to insert as HTML (e.g. `innerHTML`), but entities may appear when assigned to `textContent`.
 * Do not decode the result and then insert it as HTML.
 * To keep safe markup instead of removing it, use `sanitizeHtml`.
 *
 * @param string - The input string from which HTML tags should be removed.
 * @returns The HTML string with all HTML tags removed.
 */
export const removeAllHtmlTags = (string: string): string => {
  const sanitizeString = DOMPurify.sanitize(string, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
    USE_PROFILES: { html: false }
  })

  return sanitizeString.replace(/<\/?[^>]+(>|$)/g, '')
}
