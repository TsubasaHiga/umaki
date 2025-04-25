import 'dayjs/locale/ja'
import 'dayjs/locale/en'
import { changeDateStringToSpecificFormat } from './changeDateStringToSpecificFormat'

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

  it('should format date string with specified locale', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MM月DD日 (ddd)'
    const locale = 'ja'
    const formattedDate = changeDateStringToSpecificFormat(date, format, locale)
    expect(formattedDate).toBe('2025年04月25日 (金)')
  })

  it('should format date string with different locale', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MM月DD日 (ddd)'
    const locale = 'en'
    const formattedDate = changeDateStringToSpecificFormat(date, format, locale)
    expect(formattedDate).toBe('2025年04月25日 (Fri)')
  })

  it('should not format date string with Japanese locale when English locale is specified', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MM月DD日 (ddd)'
    const locale = 'en'
    const formattedDate = changeDateStringToSpecificFormat(date, format, locale)
    expect(formattedDate).not.toBe('2025年04月25日 (金)')
  })

  it('should not format date string with English locale when Japanese locale is specified', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MM月DD日 (ddd)'
    const locale = 'ja'
    const formattedDate = changeDateStringToSpecificFormat(date, format, locale)
    expect(formattedDate).not.toBe('2025年04月25日 (Fri)')
  })

  it('should format date string differently with different locales for month names', () => {
    const date = '2025-04-25T00:00:00.000Z'
    const format = 'YYYY年MMMMDD日'
    const jaFormattedDate = changeDateStringToSpecificFormat(date, format, 'ja')
    const enFormattedDate = changeDateStringToSpecificFormat(date, format, 'en')
    expect(jaFormattedDate).not.toBe(enFormattedDate)
    expect(jaFormattedDate).toBe('2025年4月25日')
    expect(enFormattedDate).toBe('2025年April25日')
  })
})
