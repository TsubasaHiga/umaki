import { getStylePropertyValue } from './get-style-property-value'

/**
 * Retrieves the value of a CSS custom property and converts it to a number.
 *
 * @param key - The name of the CSS custom property.
 * @returns The numeric value of the CSS custom property, or 0 if the value cannot be parsed as a number.
 */
export const getStylePropertyValueToNumber = (key: string): number =>
  Number.parseFloat(getStylePropertyValue(key)) || 0
