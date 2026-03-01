import dayjs from 'dayjs'

/**
 * Determines whether a given date/time string has already passed
 * relative to an optional reference time.
 *
 * @param dateA - A date/time string to compare, parsed with dayjs.
 * @param now - Optional reference time as a Dayjs object; defaults to current time.
 * @returns `true` if `now` is strictly after the parsed `dateA` at millisecond precision; otherwise `false`.
 * @throws Will throw an error if dateA is not a valid date.
 */
export const isAfterDateTime = (dateA: string, now = dayjs()): boolean => {
  if (!dayjs(dateA).isValid()) {
    throw new Error('dateA is not a valid date')
  }
  return now.isAfter(dayjs(dateA), 'millisecond')
}
