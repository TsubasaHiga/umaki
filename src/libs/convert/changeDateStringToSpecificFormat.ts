import dayjs from 'dayjs'

/**
 * Converts a date string to a specific format using the dayjs library.
 *
 * Note: To use specific locales, you need to import the corresponding locale file in your project.
 * Example: import 'dayjs/locale/ja'
 *
 * @param date - The date string to be converted.
 * @param format - The format to convert the date string to. Defaults to 'YYYY年MM月DD日'.
 * @param locale - The locale to use for formatting. Defaults to 'ja'.
 * @returns The formatted date string.
 */
export const changeDateStringToSpecificFormat = (
  date: string,
  format = 'YYYY年MM月DD日',
  locale = 'ja'
): string => {
  dayjs.locale(locale)
  return dayjs(date).format(format)
}
