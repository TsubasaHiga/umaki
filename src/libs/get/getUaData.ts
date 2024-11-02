import UAParser from 'ua-parser-js'

import { isTouchSupport } from '@libs/is/isTouchSupport'

export type UaType = {
  browserName?: string
  browserVersion?: string
  browserEngine?: string
  osName?: string
  type?: string
  touchSupport?: boolean
}

/**
 * Retrieves user agent (UA) information.
 *
 * This function uses the `ua-parser-js` library to parse the user agent string
 * and extract details about the browser, operating system, and device type.
 * Additionally, it checks for touch support using the `isTouchSupport` function.
 *
 * @returns {UaType} An object containing the parsed UA information:
 * - `browserName` (optional): The name of the browser, in lowercase and with spaces replaced by hyphens.
 * - `browserVersion` (optional): The version of the browser.
 * - `browserEngine` (optional): The name of the browser engine, in lowercase and with spaces replaced by hyphens.
 * - `osName` (optional): The name of the operating system, in lowercase and with spaces replaced by hyphens.
 * - `type` (optional): The type of device, in lowercase and with spaces replaced by hyphens. Defaults to 'laptop' if undefined.
 * - `touchSupport` (optional): A boolean indicating whether touch support is available.
 */
export const getUaData = (): UaType => {
  const parser = new UAParser()
  const result = parser.getResult()

  const browserName = result.browser.name
  const browserVersion = result.browser.version
  const browserEngine = result.engine.name
  const osName = result.os.name
  const type = result.device.type

  const uaString = {
    browserName: browserName ? browserName.toLowerCase().replace(' ', '-') : '',
    browserVersion: browserVersion ? browserVersion : '',
    browserEngine: browserEngine
      ? browserEngine.toLowerCase().replace(' ', '-')
      : '',
    osName: osName ? osName.toLowerCase().replace(' ', '-') : '',
    type:
      typeof type !== 'undefined'
        ? type.toLowerCase().replace(' ', '-')
        : 'laptop',
    touchSupport: isTouchSupport()
  }

  return uaString
}
