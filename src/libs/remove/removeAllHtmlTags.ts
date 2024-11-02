import DOMPurify from 'isomorphic-dompurify'

/**
 * Removes all HTML tags from the given string.
 *
 * @param string - The input string from which HTML tags should be removed.
 * @returns The sanitized string with all HTML tags removed.
 */
export const removeAllHtmlTags = (string: string): string => {
  const sanitizeString = DOMPurify.sanitize(string, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
    USE_PROFILES: { html: false }
  })

  return sanitizeString.replace(/<\/?[^>]+(>|$)/g, '')
}
