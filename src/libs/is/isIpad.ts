import { getOrientation } from '@libs/get/getOrientation'
import { getUaData } from '@libs/get/getUaData'

/**
 * Determines if the device is an iPad.
 *
 * @param orientation - The desired screen orientation ('portrait' or 'landscape'). Defaults to 'portrait'.
 * @returns `true` if the device is an iPad with the specified orientation, otherwise `false`.
 */
export const isIpad = (orientation = 'portrait'): boolean => {
  const clientData = getUaData()

  if (!clientData.touchSupport) return false

  return (
    clientData.type === 'laptop' &&
    clientData.osName === 'mac-os' &&
    clientData.browserName === 'safari' &&
    clientData.touchSupport &&
    getOrientation() === orientation
  )
}
