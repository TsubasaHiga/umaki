import { getStylePropertyValue } from './getStylePropertyValue'

/**
 * Retrieves the value of a CSS custom property and converts it to a number.
 *
 * @param key - The name of the CSS custom property.
 * @returns The numeric value of the CSS custom property, or 0 if the value cannot be parsed as a number.
 */
export const getStylePropertyValueToNumber = (key: string): number =>
  Number.parseInt(getStylePropertyValue(key), 10) || 0
