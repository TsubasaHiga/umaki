import { splitGraphemes } from '../transform/_split-graphemes'

/**
 * Returns the length of the given string in grapheme clusters (user-perceived characters).
 *
 * Emojis (e.g. 👨‍👩‍👧‍👦, 🇯🇵) and combining characters (e.g. é written as e + U+0301) are counted as one character.
 *
 * @param str - The string whose length is to be calculated.
 * @returns The length of the string.
 */
export const getStringLength = (str: string): number =>
  splitGraphemes(str).length
