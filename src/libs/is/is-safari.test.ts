import { getUaData } from '@libs/get/get-ua-data'
import type { Mock } from 'vitest'
import { isSafari } from './is-safari'

vi.mock('@libs/get/get-ua-data')

describe('isSafari', () => {
  it('should return true if browser is Safari', () => {
    ;(getUaData as Mock).mockReturnValue({ browserName: 'safari' })
    expect(isSafari()).toBe(true)
  })

  it('should return true if browser is Mobile Safari and includeMobileSafari is true', () => {
    ;(getUaData as Mock).mockReturnValue({ browserName: 'mobile-safari' })
    expect(isSafari()).toBe(true)
  })

  it('should return false if browser is Mobile Safari and includeMobileSafari is false', () => {
    ;(getUaData as Mock).mockReturnValue({ browserName: 'mobile-safari' })
    expect(isSafari(false)).toBe(false)
  })

  it('should return false if browser is not Safari or Mobile Safari', () => {
    ;(getUaData as Mock).mockReturnValue({ browserName: 'chrome' })
    expect(isSafari()).toBe(false)
  })
})
