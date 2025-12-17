/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min and max.
 * @throws If min is greater than max.
 *
 * @example
 * ```ts
 * getRandomInt(1, 10) // Returns a random integer from 1 to 10
 * getRandomInt(0, 100) // Returns a random integer from 0 to 100
 * ```
 */
export const getRandomInt = (min: number, max: number): number => {
  if (min > max) {
    throw new Error('min must be less than or equal to max')
  }

  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled
}
