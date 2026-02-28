import { getOrientation } from '@libs/get/get-orientation'
import { getUaData } from '@libs/get/get-ua-data'

type Orientation = 'portrait' | 'landscape'

/**
 * Determines if the device is an iPad.
 *
 * @param orientation - The desired screen orientation ('portrait' or 'landscape'). Defaults to 'portrait'.
 * @returns `true` if the device is an iPad with the specified orientation, otherwise `false`.
 * Returns `false` in SSR environments where window/navigator is undefined.
 */
export const isIpad = (orientation: Orientation = 'portrait'): boolean => {
  // SSR guard: return false if window or navigator is not available
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  const clientData = getUaData()

  if (!clientData.touchSupport) return false

  return (
    clientData.type === 'laptop' &&
    clientData.osName === 'mac-os' &&
    clientData.browserName === 'safari' &&
    getOrientation() === orientation
  )
}
