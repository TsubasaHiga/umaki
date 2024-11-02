import { getUaData } from '@libs/get/getUaData'

/**
 * Determines if the browser is Safari.
 *
 * @param includeMobileSafari - A boolean indicating whether to include Mobile Safari in the check. Defaults to true.
 * @returns A boolean indicating if the browser is Safari or Mobile Safari (if includeMobileSafari is true).
 */
export const isSafari = (includeMobileSafari = true): boolean => {
  const clientData = getUaData()

  if (includeMobileSafari) {
    return (
      clientData.browserName === 'safari' ||
      clientData.browserName === 'mobile-safari'
    )
  }

  return clientData.browserName === 'safari'
}
