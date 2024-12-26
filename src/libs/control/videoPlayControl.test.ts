import { videoPlayControl } from './videoPlayControl'

describe('videoPlayControl', () => {
  let videoElement: HTMLVideoElement

  beforeEach(() => {
    videoElement = document.createElement('video')
    videoElement.dataset.playing = 'false'
    document.body.appendChild(videoElement)
  })

  afterEach(() => {
    document.body.removeChild(videoElement)
  })

  it('should play the video when state is true and video is paused', async () => {
    videoElement.pause()
    const playSpy = vi
      .spyOn(videoElement, 'play')
      .mockImplementation(() => Promise.resolve())

    await videoPlayControl(videoElement, true)

    expect(playSpy).toHaveBeenCalled()
    expect(videoElement.currentTime).toBe(0)
    expect(videoElement.dataset.playing).toBe('true')
  })

  it('should play the video and set currentTime when state is true and video is paused', async () => {
    videoElement.pause()
    const playSpy = vi
      .spyOn(videoElement, 'play')
      .mockImplementation(() => Promise.resolve())

    const testCurrentTime = 10
    await videoPlayControl(videoElement, true, testCurrentTime)

    expect(playSpy).toHaveBeenCalled()
    expect(videoElement.currentTime).toBe(testCurrentTime)
    expect(videoElement.dataset.playing).toBe('true')
  })

  it('should not play the video if it is already playing', async () => {
    videoElement.dataset.playing = 'true'
    const playSpy = vi
      .spyOn(videoElement, 'play')
      .mockImplementation(() => Promise.resolve())

    await videoPlayControl(videoElement, true)

    expect(playSpy).not.toHaveBeenCalled()
  })

  it('should pause the video when state is false and video is playing', async () => {
    videoElement.play()
    videoElement.dataset.playing = 'true'
    const pauseSpy = vi
      .spyOn(videoElement, 'pause')
      .mockImplementation(() => {})

    await videoPlayControl(videoElement, false)

    expect(pauseSpy).toHaveBeenCalled()
    expect(videoElement.dataset.playing).toBe('false')
  })

  it('should pause the video even if it is already paused', async () => {
    videoElement.pause()
    const pauseSpy = vi
      .spyOn(videoElement, 'pause')
      .mockImplementation(() => {})

    await videoPlayControl(videoElement, false)

    expect(pauseSpy).toHaveBeenCalled()
  })

  it('should handle play promise rejection', async () => {
    videoElement.pause()
    const playSpy = vi
      .spyOn(videoElement, 'play')
      .mockImplementation(() => Promise.reject('error'))
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    await videoPlayControl(videoElement, true)

    expect(playSpy).toHaveBeenCalled()
    expect(consoleSpy).toHaveBeenCalledWith('error')
  })
})
