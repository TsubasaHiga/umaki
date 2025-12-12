/**
 * Converts a JSON string into a JSON object.
 *
 * @param string - The JSON string to be parsed.
 * @returns The parsed JSON object, or undefined if parsing fails.
 */
export const jsonStringToJsonObject = (string: string) => {
  try {
    return JSON.parse(string)
  } catch (error) {
    new Error(`Failed to parse JSON string: ${error}`)
  }
}
