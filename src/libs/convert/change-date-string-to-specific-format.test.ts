import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { changeDateStringToSpecificFormat } from './change-date-string-to-specific-format'

// プラグインを設定
dayjs.extend(utc)
dayjs.extend(timezone)

describe('changeDateStringToSpecificFormat', () => {
  it('should format date string to default format', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const formattedDate = changeDateStringToSpecificFormat(date)
    expect(formattedDate).toBe('2025年04月25日')
  })

  it('should format date string to specified format', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'MM/DD/YYYY'
    const formattedDate = changeDateStringToSpecificFormat(date, format)
    expect(formattedDate).toBe('04/25/2025')
  })

  it('should handle invalid date string gracefully', () => {
    const date = 'invalid-date'
    const formattedDate = changeDateStringToSpecificFormat(date)
    expect(formattedDate).toBe('Invalid Date')
  })

  it('should handle empty date string gracefully', () => {
    const date = ''
    const formattedDate = changeDateStringToSpecificFormat(date)
    expect(formattedDate).toBe('Invalid Date')
  })

  it('should handle different date formats', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'DD/MM/YYYY'
    const formattedDate = changeDateStringToSpecificFormat(date, format)
    expect(formattedDate).toBe('25/04/2025')
  })

  it('should format date string with specified timezone', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY-MM-DD HH:mm:ss'
    const tz = 'Asia/Tokyo'
    const formattedDate = changeDateStringToSpecificFormat(date, format, tz)
    // UTC 00:00 is UTC+9 09:00 in Tokyo
    expect(formattedDate).toBe('2025-04-25 09:00:00')
  })

  it('should format date string with different timezone', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY-MM-DD HH:mm:ss'
    const tz = 'America/New_York'
    const formattedDate = changeDateStringToSpecificFormat(date, format, tz)
    // UTC 00:00 is UTC-4 20:00 previous day in New York (considering DST)
    expect(formattedDate).toBe('2025-04-24 20:00:00')
  })

  it('should handle DST transitions correctly', () => {
    // A date during DST
    const dateDST = '2025-07-15T00:00:00.000Z'
    const format = 'YYYY-MM-DD HH:mm:ss'
    const tz = 'America/New_York'
    const formattedDST = changeDateStringToSpecificFormat(dateDST, format, tz)
    expect(formattedDST).toBe('2025-07-14 20:00:00')
  })

  it('should correctly format date using UTC timezone', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY-MM-DD HH:mm:ss'
    const tz = 'UTC'
    const formattedDate = changeDateStringToSpecificFormat(date, format, tz)
    expect(formattedDate).toBe('2025-04-25 00:00:00')
  })

  it('should add date-specific components properly', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MM月DD日(ddd) HH:mm:ss'
    const tz = 'Asia/Tokyo'
    const formattedDate = changeDateStringToSpecificFormat(date, format, tz)
    expect(formattedDate).toContain('2025年04月25日')
    expect(formattedDate).toContain('09:00:00')
  })
})
