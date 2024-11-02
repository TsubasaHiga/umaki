/**
 * Retrieves the current orientation of the device.
 *
 * @returns {'landscape' | 'portrait'} The current orientation, either 'landscape' or 'portrait'.
 */
export const getOrientation = (): 'landscape' | 'portrait' => {
  const isLandscape = window.matchMedia('(orientation: landscape)').matches
  return isLandscape ? 'landscape' : 'portrait'
}
