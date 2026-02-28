type ThrottleFunction = (...args: unknown[]) => void

/**
 * Creates a throttled version of the provided function that will only execute
 * at most once in the specified wait period.
 *
 * @template F - The type of the function to be throttled.
 * @param fn - The function to throttle.
 * @param wait - The number of milliseconds to wait before allowing the next execution. Must be a positive number.
 * @returns A throttled version of the provided function.
 * @throws {Error} If wait is not a positive number.
 */
export const throttle = <F extends ThrottleFunction>(
  fn: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  if (wait <= 0 || !Number.isFinite(wait)) {
    throw new Error('wait must be a positive finite number')
  }

  let lastCallTime = 0

  // Return a throttled function that only executes the original function at most once in the specified wait period.
  return (...args: Parameters<F>) => {
    const currentTime = Date.now()

    if (currentTime - lastCallTime >= wait) {
      fn(...args)
      lastCallTime = currentTime
    }
  }
}
