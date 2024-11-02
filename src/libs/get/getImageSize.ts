import sizeOf from 'image-size'

type ImageSize = number | null

type ImageMeta = {
  width: ImageSize
  height: ImageSize
}

/**
 * Retrieves the dimensions of an image from the given file path.
 * If the image dimensions are already cached, it returns the cached values.
 * Otherwise, it reads the image dimensions from the file and caches the result.
 *
 * @param imagePath - The file path of the image to get the dimensions for.
 * @returns A promise that resolves to an object containing the width and height of the image.
 *          If an error occurs or the dimensions are invalid, the width and height will be `null`.
 */
const cache: Record<string, ImageMeta> = {}

export const getImageSize = (imagePath: string): Promise<ImageMeta> => {
  return new Promise((resolve) => {
    // Check if the image is already in the cache
    if (cache[imagePath]) {
      return resolve(cache[imagePath])
    }

    sizeOf(imagePath, (err, dimensions) => {
      // error handling
      if (err) {
        console.error(err)
        return resolve({
          width: null,
          height: null
        })
      }

      // invalid dimensions
      if (!dimensions || !dimensions.width || !dimensions.height) {
        console.error('Invalid image dimensions')
        return resolve({
          width: null,
          height: null
        })
      }

      // return the dimensions
      return resolve({
        width: dimensions.width,
        height: dimensions.height
      })
    })
  })
}
