import { getConfigValue } from '../config'

/**
 * Check the current device size based on window width and the configured breakpoint
 * @returns 'md' for medium/large devices, 'sm' for small devices
 */
export const checkDeviceSize = (): 'md' | 'sm' => {
  // Use the global BREAKPOINT configuration value
  const breakpoint = getConfigValue('BREAKPOINT')

  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return window.innerWidth > breakpoint ? 'md' : 'sm'
  }

  // Default to 'md' if not in browser environment
  return 'md'
}
