import UAParser from 'ua-parser-js'
import type { Mock } from 'vitest'
import { getUaData } from './getUaData'

vi.mock('ua-parser-js')

describe('getUaData', () => {
  it('should return correct UA data with all fields populated', () => {
    const mockResult = {
      browser: { name: 'Chrome', version: '91.0.4472.124' },
      engine: { name: 'Blink' },
      os: { name: 'Windows' },
      device: { type: 'desktop' }
    }
    ;(UAParser as unknown as Mock).mockImplementation(() => ({
      getResult: () => mockResult
    }))

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
    ;(UAParser as unknown as Mock).mockImplementation(() => ({
      getResult: () => mockResult
    }))

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
})
