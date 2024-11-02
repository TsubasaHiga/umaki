import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

/**
 * Checks if the current date is between dateA and dateB.
 *
 * @param dateA - The start date in string format.
 * @param dateB - The end date in string format.
 * @param now - The current date, defaults to the current date and time if not provided.
 * @returns A boolean indicating whether the current date is between dateA and dateB.
 * @throws Will throw an error if dateA or dateB is not a valid date.
 */
export const isBetweenDateTime = (
  dateA: string,
  dateB: string,
  now = dayjs()
): boolean => {
  // dateAとdateBが正しい日付かどうかを判定する
  if (!dayjs(dateA).isValid() || !dayjs(dateB).isValid()) {
    // 正しくない場合はエラーをthrowする
    throw new Error('dateA or dateB is not valid date')
  }

  const a = dayjs(dateA)
  const b = dayjs(dateB)
  return now.isBetween(a, b, 'millisecond')
}
