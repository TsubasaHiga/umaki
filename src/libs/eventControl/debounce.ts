type DebounceProcedure = (...args: unknown[]) => void

/**
 * Creates a debounced function that delays invoking the provided function until after the specified delay.
 *
 * @template F - The type of the function to debounce.
 * @param {F} fn - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @returns {(...args: Parameters<F>) => void} - A debounced version of the provided function.
 */
export const debounce = <F extends DebounceProcedure>(
  fn: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>) => {
    timeoutId && clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}
