import DOMPurify, { type Config } from 'isomorphic-dompurify'

// Options that make DOMPurify return a non-string or mutate a node; always disabled to keep the string contract
const STRING_OUTPUT_CONFIG = {
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
  IN_PLACE: false
} as const

export type HtmlSanitizeConfig = Omit<Config, keyof typeof STRING_OUTPUT_CONFIG>

/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 *
 * The result is safe to insert as HTML element content (e.g. `innerHTML`).
 * It is NOT safe for other contexts such as attribute values, URLs, `<script>` or CSS.
 *
 * Options that weaken the default protection (e.g. `ALLOWED_URI_REGEXP`, `ADD_TAGS`,
 * `ALLOW_UNKNOWN_PROTOCOLS`, `SAFE_FOR_TEMPLATES: false`) are passed through to DOMPurify as is.
 * `RETURN_DOM`, `RETURN_DOM_FRAGMENT`, `RETURN_TRUSTED_TYPE` and `IN_PLACE` are not accepted
 * (a type error, and ignored at runtime), so the return value is always a string.
 *
 * @param html - The HTML string to sanitize.
 * @param config - Optional configuration for DOMPurify.
 * @returns The sanitized HTML string.
 */
export const htmlSanitize = (
  html: string,
  config: HtmlSanitizeConfig = {}
): string => {
  return DOMPurify.sanitize(html, { ...config, ...STRING_OUTPUT_CONFIG })
}

/**
 * Alias for htmlSanitize.
 * Sanitizes the given HTML string to prevent XSS attacks.
 *
 * @param html - The HTML string to sanitize.
 * @param config - Optional configuration for DOMPurify.
 * @returns The sanitized HTML string.
 */
export const sanitizeHtml = htmlSanitize
