/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * Uses `Math.random()`, which is not cryptographically secure.
 * Use `crypto.getRandomValues()` for tokens, IDs or passwords.
 *
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random integer between min and max.
 * @throws If min or max is not a finite number, min is greater than max,
 * or no integer exists between min and max (e.g. `getRandomInt(1.2, 1.8)`).
 *
 * @example
 * ```ts
 * getRandomInt(1, 10) // Returns a random integer from 1 to 10
 * getRandomInt(0, 100) // Returns a random integer from 0 to 100
 * ```
 */
export const getRandomInt = (min: number, max: number): number => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error('min and max must be finite numbers')
  }
  if (min > max) {
    throw new Error('min must be less than or equal to max')
  }

  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  if (minCeiled > maxFloored) {
    throw new Error('No integer exists between min and max')
  }

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled
}
