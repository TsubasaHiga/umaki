import dayjs from 'dayjs'
import { isBetweenDateTime } from './is-between-date-time'

describe('isBetweenDateTime', () => {
  it('should return true if now is between dateA and dateB', () => {
    const dateA = dayjs().subtract(1, 'day').format()
    const dateB = dayjs().add(1, 'day').format()
    const now = dayjs()
    expect(isBetweenDateTime(dateA, dateB, now)).toBe(true)
  })

  it('should return false if now is not between dateA and dateB', () => {
    const dateA = dayjs().subtract(2, 'day').format()
    const dateB = dayjs().subtract(1, 'day').format()
    const now = dayjs()
    expect(isBetweenDateTime(dateA, dateB, now)).toBe(false)
  })

  it('should throw an error if dateA is not a valid date', () => {
    const dateA = 'invalid-date'
    const dateB = dayjs().add(1, 'day').format()
    expect(() => isBetweenDateTime(dateA, dateB)).toThrow(
      'dateA or dateB is not valid date'
    )
  })

  it('should throw an error if dateB is not a valid date', () => {
    const dateA = dayjs().subtract(1, 'day').format()
    const dateB = 'invalid-date'
    expect(() => isBetweenDateTime(dateA, dateB)).toThrow(
      'dateA or dateB is not valid date'
    )
  })
})
