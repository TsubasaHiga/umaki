import { waitForAllMediaLoaded } from './wait-for-all-media-loaded'

describe('waitForAllMediaLoaded', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should resolve immediately if there are no media elements', async () => {
    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should resolve immediately if document.images is not available', async () => {
    const originalImages = document.images
    Object.defineProperty(document, 'images', {
      value: null,
      configurable: true
    })

    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)

    Object.defineProperty(document, 'images', {
      value: originalImages,
      configurable: true
    })
  })

  it('should resolve when all images are already loaded (complete=true)', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should resolve when all videos are already loaded (readyState>=3)', async () => {
    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 4,
      configurable: true
    })
    document.body.appendChild(video)

    // Need at least one image for document.images.length > 0 check
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should skip lazy-loaded images', async () => {
    const lazyImg = document.createElement('img')
    lazyImg.setAttribute('loading', 'lazy')
    Object.defineProperty(lazyImg, 'complete', {
      value: false,
      configurable: true
    })
    document.body.appendChild(lazyImg)

    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should wait for image load event when image is not complete', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: false,
      configurable: true
    })
    document.body.appendChild(img)

    const promise = waitForAllMediaLoaded()

    // Simulate image load
    img.dispatchEvent(new Event('load'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should wait for image error event when image fails to load', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: false,
      configurable: true
    })
    document.body.appendChild(img)

    const promise = waitForAllMediaLoaded()

    // Simulate image error
    img.dispatchEvent(new Event('error'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should wait for video loadeddata event when video is not ready', async () => {
    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 0,
      configurable: true
    })
    document.body.appendChild(video)

    // Need at least one image for document.images.length > 0 check
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const promise = waitForAllMediaLoaded()

    // Simulate video loaded
    video.dispatchEvent(new Event('loadeddata'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should wait for video error event when video fails to load', async () => {
    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 0,
      configurable: true
    })
    document.body.appendChild(video)

    // Need at least one image for document.images.length > 0 check
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const promise = waitForAllMediaLoaded()

    // Simulate video error
    video.dispatchEvent(new Event('error'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should filter media elements to only those in the first view if firstViewOnly is true', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const imgOutOfView = document.createElement('img')
    Object.defineProperty(imgOutOfView, 'complete', {
      value: false,
      configurable: true
    })
    Object.defineProperty(imgOutOfView, 'getBoundingClientRect', {
      value: () => ({
        top: window.innerHeight + 1,
        bottom: window.innerHeight + 100
      }),
      configurable: true
    })
    document.body.appendChild(imgOutOfView)

    // Should resolve immediately since out-of-view image is filtered out
    const result = await waitForAllMediaLoaded(true)
    expect(result).toBe(true)
  })

  it('should include media elements partially visible in the first view', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: false,
      configurable: true
    })
    // Element that starts above viewport but extends into it
    Object.defineProperty(img, 'getBoundingClientRect', {
      value: () => ({
        top: -50,
        bottom: 100
      }),
      configurable: true
    })
    document.body.appendChild(img)

    const promise = waitForAllMediaLoaded(true)

    img.dispatchEvent(new Event('load'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should handle multiple images with mixed states', async () => {
    // Already loaded image
    const img1 = document.createElement('img')
    Object.defineProperty(img1, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img1)

    // Not yet loaded image
    const img2 = document.createElement('img')
    Object.defineProperty(img2, 'complete', {
      value: false,
      configurable: true
    })
    document.body.appendChild(img2)

    const promise = waitForAllMediaLoaded()

    // Only img2 needs to fire load event
    img2.dispatchEvent(new Event('load'))

    const result = await promise
    expect(result).toBe(true)
  })

  it('should resolve when all media elements are filtered out in firstViewOnly mode', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: false,
      configurable: true
    })
    Object.defineProperty(img, 'getBoundingClientRect', {
      value: () => ({
        top: window.innerHeight + 100,
        bottom: window.innerHeight + 200
      }),
      configurable: true
    })
    document.body.appendChild(img)

    const result = await waitForAllMediaLoaded(true)
    expect(result).toBe(true)
  })
})
