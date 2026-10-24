// runes2 splits combining marks (e.g. 'e\u0301'), so use Intl.Segmenter for grapheme clusters
const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' })
const splitGraphemes = (value: string): string[] =>
  Array.from(segmenter.segment(value), ({ segment }) => segment)

/**
 * Truncates a string to the given length and appends an omission string.
 *
 * Lengths are counted in grapheme clusters (`Intl.Segmenter`), so emojis and combining characters are never split.
 * The result, including the omission, is at most `maxLength` characters long.
 * If `maxLength` is shorter than the omission, the omission itself is cut to `maxLength`.
 *
 * @param str - The string to truncate.
 * @param maxLength - The maximum length of the result, including the omission.
 * @param omission - The string appended when truncated. Defaults to `'...'`.
 * @returns The truncated string, or `str` as is if it is not longer than `maxLength`.
 * @throws If maxLength is not a non-negative integer.
 *
 * @example
 * ```ts
 * truncate('Hello, world!', 8) // 'Hello...'
 * truncate('Hello, world!', 8, '…') // 'Hello, …'
 * truncate('Hello', 10) // 'Hello'
 * ```
 */
export const truncate = (
  str: string,
  maxLength: number,
  omission = '...'
): string => {
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new Error('maxLength must be a non-negative integer')
  }

  const chars = splitGraphemes(str)
  if (chars.length <= maxLength) return str

  const omissionChars = splitGraphemes(omission)
  if (omissionChars.length >= maxLength) {
    return omissionChars.slice(0, maxLength).join('')
  }

  return chars.slice(0, maxLength - omissionChars.length).join('') + omission
}
