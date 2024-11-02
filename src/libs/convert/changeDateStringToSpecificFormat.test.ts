import { changeDateStringToSpecificFormat } from './changeDateStringToSpecificFormat'

describe('changeDateStringToSpecificFormat', () => {
  it('should format date string to default format', () => {
    const date = '2023-10-05'
    const formattedDate = changeDateStringToSpecificFormat(date)
    expect(formattedDate).toBe('2023年10月05日')
  })

  it('should format date string to specified format', () => {
    const date = '2023-10-05'
    const format = 'MM/DD/YYYY'
    const formattedDate = changeDateStringToSpecificFormat(date, format)
    expect(formattedDate).toBe('10/05/2023')
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
    const date = '05-10-2023'
    const format = 'DD/MM/YYYY'
    const formattedDate = changeDateStringToSpecificFormat(date, format)
    expect(formattedDate).toBe('10/05/2023')
  })
})
