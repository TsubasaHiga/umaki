import { getOrientation } from '@libs/get/get-orientation'
import { getUaData } from '@libs/get/get-ua-data'
import { isIpad } from './is-ipad'

vi.mock('@libs/get/get-orientation')
vi.mock('@libs/get/get-ua-data')

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

  it('should return false in SSR environment (window undefined)', () => {
    const originalWindow = global.window
    // @ts-expect-error - Simulating SSR environment
    delete global.window

    expect(isIpad()).toBe(false)

    global.window = originalWindow
  })

  it('should return false in SSR environment (navigator undefined)', () => {
    const originalNavigator = global.navigator
    // @ts-expect-error - Simulating SSR environment
    delete global.navigator

    expect(isIpad()).toBe(false)

    global.navigator = originalNavigator
  })
})
