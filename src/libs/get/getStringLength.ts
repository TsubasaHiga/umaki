import { runes } from 'runes2'

/**
 * Returns the length of the given string, accounting for Unicode characters.
 *
 * This function uses the `runes` library to correctly handle strings with
 * Unicode characters, ensuring that each character is counted accurately.
 *
 * @param str - The string whose length is to be calculated.
 * @returns The length of the string.
 */
export const getStringLength = (str: string): number => runes(str).length
