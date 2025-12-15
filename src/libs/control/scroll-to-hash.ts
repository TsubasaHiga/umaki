/**
 * Scrolls to a specific hash location on the page (Promise-based).
 *
 * @param hash - The hash string to scroll to. If the hash includes a '#', it will be removed.
 * @param isSmooth - Determines if the scroll behavior should be smooth. Defaults to true.
 * @param manualOffset - An optional manual offset to adjust the scroll position.
 * @returns A Promise that resolves to true if the scroll was successful, or false if the target element was not found or the scroll did not complete within the timeout.
 */
export const scrollToHash = async (
  hash: string,
  isSmooth = true,
  manualOffset?: number
): Promise<boolean> => {
  // hashに#がついている場合は削除
  const hashWithoutSharp = hash.replace('#', '')
  const targetElement = document.getElementById(hashWithoutSharp)
  if (!targetElement) return false

  const elementPosY = Math.floor(
    targetElement.getBoundingClientRect().top + window.scrollY
  )

  // manualOffsetがある場合はmanualOffsetを優先する
  const offset = manualOffset ? manualOffset : 0
  const posY = elementPosY - offset

  window.scrollTo({
    top: posY,
    behavior: isSmooth ? 'smooth' : 'instant'
  })

  return new Promise((resolve) => {
    const rejectTimer = setTimeout(() => {
      window.removeEventListener('scroll', scrollHandler)
      resolve(false)
    }, 1000)

    const scrollHandler = () => {
      if (window.scrollY !== posY) return

      window.removeEventListener('scroll', scrollHandler)
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (window.scrollY === posY) {
      clearTimeout(rejectTimer)
      resolve(true)
    }

    if (window.scrollY !== posY) {
      window.addEventListener('scroll', scrollHandler, false)
    }
  })
}
