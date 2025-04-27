import dayjs from 'dayjs'

/**
 * Determines whether a given date/time string has already passed
 * relative to an optional reference time.
 *
 * @param dateA - A date/time string to compare, parsed with dayjs.
 * @param now - Optional reference time as a Dayjs object; defaults to current time.
 * @returns `true` if `now` is strictly after the parsed `dateA` at millisecond precision; otherwise `false`.
 */
export const isAfterDateTime = (dateA: string, now = dayjs()): boolean => {
  return now.isAfter(dayjs(dateA), 'millisecond')
}
