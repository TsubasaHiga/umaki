import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 *
 * @param html - The HTML string to sanitize.
 * @param config - Optional configuration for DOMPurify.
 * @returns The sanitized HTML string.
 */
export function sanitizeHtml(
  html: string,
  config: Parameters<typeof DOMPurify.sanitize>[1] = {}
): string {
  return DOMPurify.sanitize(html, config)
}
