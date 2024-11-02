/**
 * Waits for all images and videos in the document to be fully loaded.
 *
 * @param firstViewOnly - If true, only considers media elements within the first view (viewport height).
 * @returns A promise that resolves to true when all media elements are loaded.
 */
export const waitForAllMediaLoaded = async (
  firstViewOnly = false
): Promise<boolean> => {
  if (!document.images) return Promise.resolve(true)

  if (document.images.length === 0) return Promise.resolve(true)

  const images = Array.from(document.images).filter(
    (img) => img.getAttribute('loading') !== 'lazy'
  ) as HTMLImageElement[]

  const videos = Array.from(
    document.getElementsByTagName('video')
  ) as HTMLVideoElement[]

  let mediaElements: (HTMLImageElement | HTMLVideoElement)[] = [
    ...images,
    ...videos
  ]

  if (firstViewOnly) {
    const firstViewHeight = window.innerHeight
    mediaElements = mediaElements.filter((media) => {
      const rect = media.getBoundingClientRect()
      return rect.top < firstViewHeight && rect.bottom > 0
    })
  }

  if (mediaElements.length === 0) return Promise.resolve(true)

  await Promise.all(
    mediaElements.map((media) => {
      if (media instanceof HTMLImageElement && media.complete)
        return Promise.resolve()
      if (media instanceof HTMLVideoElement && media.readyState >= 3)
        return Promise.resolve()

      return new Promise<void>((resolve) => {
        const eventHandler = () => resolve()
        if (media instanceof HTMLImageElement) {
          media.addEventListener('load', eventHandler, { once: true })
          media.addEventListener('error', eventHandler, { once: true })
        } else if (media instanceof HTMLVideoElement) {
          media.addEventListener('loadeddata', eventHandler, { once: true })
          media.addEventListener('error', eventHandler, { once: true })
        }
      })
    })
  )

  return true
}
