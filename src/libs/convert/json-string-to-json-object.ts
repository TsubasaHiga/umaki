/**
 * Converts a JSON string into a JSON object.
 *
 * @param string - The JSON string to be parsed.
 * @returns The parsed JSON object, or undefined if parsing fails.
 */
export const jsonStringToJsonObject = (string: string): unknown => {
  try {
    return JSON.parse(string)
  } catch {
    return undefined
  }
}
