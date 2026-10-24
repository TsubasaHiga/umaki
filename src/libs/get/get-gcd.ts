import { toPositiveNumber } from '@libs/to/to-positive-number'

/**
 * Calculates and returns the greatest common divisor (GCD) of two numbers.
 *
 * This function uses the Euclidean algorithm to find the GCD. It first converts
 * both numbers to their positive equivalents using the `toPositiveNumber` function.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @returns The greatest common divisor of the two numbers.
 * @throws {Error} If a or b is not a finite number.
 */
export const getGcd = (a: number, b: number): number => {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new Error('Arguments must be finite numbers')
  }

  const positiveA = toPositiveNumber(a)
  const positiveB = toPositiveNumber(b)

  if (positiveB === 0) return positiveA
  return getGcd(positiveB, positiveA % positiveB)
}
