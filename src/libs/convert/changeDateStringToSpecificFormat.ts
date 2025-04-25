import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

/**
 * Converts a date string to a specific format using the dayjs library.
 *
 * Note: This function focuses on timezone handling rather than locale-specific formatting.
 *
 * @param date - The date string to be converted.
 * @param format - The format to convert the date string to. Defaults to 'YYYY年MM月DD日'.
 * @param tz - Optional timezone (e.g., 'Asia/Tokyo'). If provided, the date will be converted to this timezone.
 * @returns The formatted date string.
 */
export const changeDateStringToSpecificFormat = (
  date: string,
  format = 'YYYY年MM月DD日',
  tz?: string | null
): string => {
  // Setup timezone plugins if timezone is specified
  if (tz) {
    dayjs.extend(utc)
    dayjs.extend(timezone)
    return dayjs(date).tz(tz).format(format)
  }

  return dayjs(date).format(format)
}
