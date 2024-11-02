import { waitForAllMediaLoaded } from './waitForAllMediaLoaded'

describe('waitForAllMediaLoaded', () => {
  it('should resolve immediately if there are no media elements', async () => {
    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should resolve when all images and videos are loaded', async () => {
    const img = document.createElement('img')
    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    document.body.appendChild(img)

    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 4,
      configurable: true
    })
    document.body.appendChild(video)

    const result = await waitForAllMediaLoaded()
    expect(result).toBe(true)
  })

  it('should wait for lazy-loaded images and videos to load', async () => {
    const img = document.createElement('img')
    img.setAttribute('loading', 'lazy')
    document.body.appendChild(img)

    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 0,
      configurable: true
    })
    document.body.appendChild(video)

    const promise = waitForAllMediaLoaded()

    Object.defineProperty(img, 'complete', {
      value: true,
      configurable: true
    })
    Object.defineProperty(video, 'readyState', {
      value: 4,
      configurable: true
    })

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

    const video = document.createElement('video')
    Object.defineProperty(video, 'readyState', {
      value: 4,
      configurable: true
    })
    document.body.appendChild(video)

    const imgOutOfView = document.createElement('img')
    Object.defineProperty(imgOutOfView, 'complete', {
      value: true,
      configurable: true
    })
    Object.defineProperty(imgOutOfView, 'getBoundingClientRect', {
      value: () => ({
        top: window.innerHeight + 1,
        bottom: window.innerHeight + 2
      })
    })
    document.body.appendChild(imgOutOfView)

    const result = await waitForAllMediaLoaded(true)
    expect(result).toBe(true)
  })
})
