import { getScrollbarWidth } from '@libs/get/get-scrollbar-width'

/**
 * Stops or resumes background scrolling by manipulating the body's overflow and padding-right styles.
 *
 * @param {boolean} [isStop=true] - A boolean indicating whether to stop (true) or resume (false) background scrolling.
 *                                  Defaults to true.
 *
 * When `isStop` is true, the function:
 * - Sets the body's `paddingRight` style to the width of the scrollbar to prevent layout shift.
 * - Sets the body's `overflow` style to 'hidden' to stop background scrolling.
 *
 * When `isStop` is false, the function:
 * - Resets the body's `paddingRight` style.
 * - Resets the body's `overflow` style to allow background scrolling.
 */
export const bgScrollStop = (isStop = true): void => {
  document.body.style.paddingRight = isStop ? `${getScrollbarWidth()}px` : ''

  if (isStop) {
    document.body.style.overflow = 'hidden'
  }

  if (!isStop) {
    document.body.style.overflow = ''
  }
}
