import UAParser from 'ua-parser-js'
import type { Mock } from 'vitest'
import { getUaData } from './get-ua-data'

vi.mock('ua-parser-js', () => ({
  default: vi.fn()
}))

describe('getUaData', () => {
  it('should return correct UA data with all fields populated', () => {
    const mockResult = {
      browser: { name: 'Chrome', version: '91.0.4472.124' },
      engine: { name: 'Blink' },
      os: { name: 'Windows' },
      device: { type: 'desktop' }
    }
    // biome-ignore lint/complexity/useArrowFunction: Vitest requires function/class for constructor mocks
    ;(UAParser as unknown as Mock).mockImplementation(function () {
      return { getResult: () => mockResult }
    })

    const uaData = getUaData()

    expect(uaData).toEqual({
      browserName: 'chrome',
      browserVersion: '91.0.4472.124',
      browserEngine: 'blink',
      osName: 'windows',
      type: 'desktop',
      touchSupport: false
    })
  })

  it('should return default values for undefined fields', () => {
    const mockResult = {
      browser: { name: undefined, version: undefined },
      engine: { name: undefined },
      os: { name: undefined },
      device: { type: undefined }
    }
    // biome-ignore lint/complexity/useArrowFunction: Vitest requires function/class for constructor mocks
    ;(UAParser as unknown as Mock).mockImplementation(function () {
      return { getResult: () => mockResult }
    })

    const uaData = getUaData()

    expect(uaData).toEqual({
      browserName: '',
      browserVersion: '',
      browserEngine: '',
      osName: '',
      type: 'laptop',
      touchSupport: false
    })
  })

  it('should replace multiple spaces with hyphens', () => {
    const mockResult = {
      browser: { name: 'Mobile Safari UI', version: '15.0' },
      engine: { name: 'WebKit Core' },
      os: { name: 'Mac OS X' },
      device: { type: 'mobile device' }
    }
    // biome-ignore lint/complexity/useArrowFunction: Vitest requires function/class for constructor mocks
    ;(UAParser as unknown as Mock).mockImplementation(function () {
      return { getResult: () => mockResult }
    })

    const uaData = getUaData()

    expect(uaData).toEqual({
      browserName: 'mobile-safari-ui',
      browserVersion: '15.0',
      browserEngine: 'webkit-core',
      osName: 'mac-os-x',
      type: 'mobile-device',
      touchSupport: false
    })
  })
})
