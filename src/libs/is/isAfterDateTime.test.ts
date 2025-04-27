import dayjs from 'dayjs'
import { isAfterDateTime } from './isAfterDateTime'

describe('isAfterDateTime', () => {
  it('should return true when reference time is after the given date', () => {
    const now = dayjs('2023-01-02T12:00:00Z')
    const past = '2023-01-01T12:00:00Z'

    expect(isAfterDateTime(past, now)).toBe(true)
  })

  it('should return false when reference time is before the given date', () => {
    const now = dayjs('2023-01-01T12:00:00Z')
    const future = '2023-01-02T12:00:00Z'

    expect(isAfterDateTime(future, now)).toBe(false)
  })

  it('should return false when dates are exactly the same', () => {
    const now = dayjs('2023-01-01T12:00:00.000Z')
    const same = '2023-01-01T12:00:00.000Z'

    expect(isAfterDateTime(same, now)).toBe(false)
  })

  it('should correctly handle millisecond precision', () => {
    const now = dayjs('2023-01-01T12:00:00.001Z')
    const slightlyBefore = '2023-01-01T12:00:00.000Z'

    expect(isAfterDateTime(slightlyBefore, now)).toBe(true)
  })

  it('should work with different date formats', () => {
    const now = dayjs('2023-01-01')

    expect(isAfterDateTime('2022-12-31', now)).toBe(true)
    expect(isAfterDateTime('Dec 31, 2022', now)).toBe(true)
    expect(isAfterDateTime('2023/01/02', now)).toBe(false)
  })

  it('should use current time as default when now parameter is not provided', () => {
    // Mock current date to a fixed value
    const mockNow = dayjs('2023-01-15T12:00:00Z')
    const originalDayjs = dayjs

    // dayjs全体をモック
    vi.stubGlobal('dayjs', () => mockNow)

    expect(isAfterDateTime('2023-01-14T12:00:00Z')).toBe(true)

    // 元に戻す
    vi.stubGlobal('dayjs', originalDayjs)
  })

  it('should handle invalid date strings', () => {
    const now = dayjs('2023-01-01T12:00:00Z')

    // Invalid dates in dayjs are treated as "Invalid Date"
    // Check implementation-specific behavior
    expect(isAfterDateTime('not a date', now)).toBe(false)
  })
})
