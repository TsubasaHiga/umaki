import { getRelativeTime } from './get-relative-time'

describe('getRelativeTime', () => {
  const baseDate = new Date('2025-01-15T12:00:00Z')

  describe('past dates', () => {
    it('should return seconds ago', () => {
      const date = new Date(baseDate.getTime() - 30 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('30 seconds ago')
    })

    it('should return minutes ago', () => {
      const date = new Date(baseDate.getTime() - 5 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('5 minutes ago')
    })

    it('should return hours ago', () => {
      const date = new Date(baseDate.getTime() - 3 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('3 hours ago')
    })

    it('should return days ago', () => {
      const date = new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('2 days ago')
    })

    it('should return weeks ago', () => {
      const date = new Date(baseDate.getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('2 weeks ago')
    })

    it('should return months ago', () => {
      const date = new Date(baseDate.getTime() - 2 * 30 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('2 months ago')
    })

    it('should return years ago', () => {
      const date = new Date(baseDate.getTime() - 2 * 365 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('2 years ago')
    })
  })

  describe('future dates', () => {
    it('should return seconds from now', () => {
      const date = new Date(baseDate.getTime() + 30 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('in 30 seconds')
    })

    it('should return minutes from now', () => {
      const date = new Date(baseDate.getTime() + 5 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('in 5 minutes')
    })

    it('should return hours from now', () => {
      const date = new Date(baseDate.getTime() + 3 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('in 3 hours')
    })

    it('should return days from now', () => {
      const date = new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'en', baseDate)
      expect(result).toBe('in 2 days')
    })
  })

  describe('Japanese locale', () => {
    it('should return Japanese relative time for past', () => {
      const date = new Date(baseDate.getTime() - 5 * 60 * 1000)
      const result = getRelativeTime(date, 'ja', baseDate)
      expect(result).toBe('5 分前')
    })

    it('should return Japanese relative time for future', () => {
      const date = new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000)
      const result = getRelativeTime(date, 'ja', baseDate)
      expect(result).toBe('3 日後')
    })
  })

  describe('input types', () => {
    it('should accept timestamp number', () => {
      const timestamp = baseDate.getTime() - 60 * 1000
      const result = getRelativeTime(timestamp, 'en', baseDate)
      expect(result).toBe('1 minute ago')
    })

    it('should accept ISO date string', () => {
      const dateString = new Date(
        baseDate.getTime() - 60 * 60 * 1000
      ).toISOString()
      const result = getRelativeTime(dateString, 'en', baseDate)
      expect(result).toBe('1 hour ago')
    })
  })

  describe('default locale', () => {
    it('should use Japanese as default locale', () => {
      const date = new Date(baseDate.getTime() - 5 * 60 * 1000)
      const result = getRelativeTime(date, undefined, baseDate)
      expect(result).toBe('5 分前')
    })
  })
})
