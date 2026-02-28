/**
 * Retrieves the current orientation of the device.
 *
 * @returns {'landscape' | 'portrait'} The current orientation, either 'landscape' or 'portrait'.
 * Returns 'portrait' as default in SSR environments where window is undefined.
 */
export const getOrientation = (): 'landscape' | 'portrait' => {
  if (typeof window === 'undefined') {
    return 'portrait'
  }
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  return isLandscape ? 'landscape' : 'portrait'
}
