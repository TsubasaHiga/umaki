type ThrottleFunction = (...args: unknown[]) => void

/**
 * Creates a throttled version of the provided function that will only execute
 * at most once in the specified wait period.
 *
 * @template F - The type of the function to be throttled.
 * @param fn - The function to throttle.
 * @param wait - The number of milliseconds to wait before allowing the next execution.
 * @returns A throttled version of the provided function.
 */
export const throttle = <F extends ThrottleFunction>(
  fn: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
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
