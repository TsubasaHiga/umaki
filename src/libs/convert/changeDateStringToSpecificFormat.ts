import dayjs from 'dayjs'

/**
 * Converts a date string to a specific format using the dayjs library.
 *
 * @param date - The date string to be converted.
 * @param format - The format to convert the date string to. Defaults to 'YYYY年MM月DD日'.
 * @returns The formatted date string.
 */
export const changeDateStringToSpecificFormat = (
  date: string,
  format = 'YYYY年MM月DD日'
): string => dayjs(date).format(format)
