/**
 * Pauses the execution for a specified amount of time.
 *
 * @param time - The duration to sleep in seconds.
 * @returns A promise that resolves after the specified time.
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000))
}
