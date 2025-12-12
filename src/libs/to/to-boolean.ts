/**
 * Converts a string to a boolean value.
 *
 * @param booleanStr - The string to convert to a boolean. If the string is 'true' (case insensitive), it returns true. For any other value, it returns false. If the input is null, it also returns false.
 * @returns A boolean value based on the input string.
 */
export const toBoolean = (booleanStr: string | null): boolean => {
  return booleanStr ? booleanStr.toLowerCase() === 'true' : false
}
