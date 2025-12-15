import { getOrientation } from '@libs/get/get-orientation'
import { getUaData } from '@libs/get/get-ua-data'

type Orientation = 'portrait' | 'landscape'

/**
 * Determines if the device is an iPad.
 *
 * @param orientation - The desired screen orientation ('portrait' or 'landscape'). Defaults to 'portrait'.
 * @returns `true` if the device is an iPad with the specified orientation, otherwise `false`.
 */
export const isIpad = (orientation: Orientation = 'portrait'): boolean => {
  const clientData = getUaData()

  if (!clientData.touchSupport) return false

  return (
    clientData.type === 'laptop' &&
    clientData.osName === 'mac-os' &&
    clientData.browserName === 'safari' &&
    getOrientation() === orientation
  )
}
