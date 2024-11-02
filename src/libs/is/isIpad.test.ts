import { getOrientation } from '@libs/get/getOrientation'
import { getUaData } from '@libs/get/getUaData'
import { isIpad } from './isIpad'

vi.mock('@libs/get/getOrientation')
vi.mock('@libs/get/getUaData')

describe('isIpad', () => {
  it('should return false if touch support is not available', () => {
    vi.mocked(getUaData).mockReturnValue({
      touchSupport: false,
      type: 'laptop',
      osName: 'mac-os',
      browserName: 'safari'
    })

    expect(isIpad()).toBe(false)
  })

  it('should return false if client data does not match iPad criteria', () => {
    vi.mocked(getUaData).mockReturnValue({
      touchSupport: true,
      type: 'desktop',
      osName: 'windows',
      browserName: 'chrome'
    })

    expect(isIpad()).toBe(false)
  })

  it('should return true if client data matches iPad criteria and orientation is portrait', () => {
    vi.mocked(getUaData).mockReturnValue({
      touchSupport: true,
      type: 'laptop',
      osName: 'mac-os',
      browserName: 'safari'
    })
    vi.mocked(getOrientation).mockReturnValue('portrait')

    expect(isIpad('portrait')).toBe(true)
  })

  it('should return false if orientation does not match', () => {
    vi.mocked(getUaData).mockReturnValue({
      touchSupport: true,
      type: 'laptop',
      osName: 'mac-os',
      browserName: 'safari'
    })
    vi.mocked(getOrientation).mockReturnValue('landscape')

    expect(isIpad('portrait')).toBe(false)
  })
})
