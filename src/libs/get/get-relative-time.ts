type RelativeTimeUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'

interface TimeInterval {
  unit: RelativeTimeUnit
  seconds: number
}

const TIME_INTERVALS: TimeInterval[] = [
  { unit: 'year', seconds: 31536000 },
  { unit: 'month', seconds: 2592000 },
  { unit: 'week', seconds: 604800 },
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 }
]

/**
 * Returns a human-readable relative time string (e.g., "3 minutes ago", "2 days ago").
 *
 * Uses the browser's Intl.RelativeTimeFormat API for localization.
 *
 * @param date - The date to compare against the current time (or baseDate if provided).
 *               Can be a Date object, timestamp number, or ISO date string.
 * @param locale - The locale to use for formatting. Defaults to 'ja' (Japanese).
 * @param baseDate - The base date to compare against. Defaults to current time.
 * @returns A localized relative time string.
 *
 * @example
 * ```ts
 * // Japanese (default)
 * getRelativeTime(new Date(Date.now() - 3 * 60 * 1000)) // "3分前"
 * getRelativeTime(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)) // "2日前"
 *
 * // English
 * getRelativeTime(new Date(Date.now() - 3 * 60 * 1000), 'en') // "3 minutes ago"
 *
 * // Future dates
 * getRelativeTime(new Date(Date.now() + 5 * 60 * 1000)) // "5分後"
 * ```
 */
export const getRelativeTime = (
  date: Date | number | string,
  locale: string = 'ja',
  baseDate: Date | number | string = new Date()
): string => {
  const targetDate = date instanceof Date ? date : new Date(date)
  const base = baseDate instanceof Date ? baseDate : new Date(baseDate)

  const diffInSeconds = Math.floor(
    (targetDate.getTime() - base.getTime()) / 1000
  )
  const absDiff = Math.abs(diffInSeconds)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  for (const interval of TIME_INTERVALS) {
    if (absDiff >= interval.seconds) {
      const value = Math.floor(absDiff / interval.seconds)
      return rtf.format(diffInSeconds >= 0 ? value : -value, interval.unit)
    }
  }

  return rtf.format(diffInSeconds >= 0 ? absDiff : -absDiff, 'second')
}
