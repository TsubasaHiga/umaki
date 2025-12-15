import { toBoolean } from '@libs/to/to-boolean'

/**
 * Controls the playback of a video element based on the provided state.
 *
 * @param videoElement - The HTMLVideoElement to control.
 * @param state - A boolean indicating whether to play (true) or pause (false) the video.
 * @returns A Promise that resolves when the playback state change is complete.
 *
 * The function checks the current playback state of the video element and updates it
 * according to the provided state. If the state is true and the video is paused, it will
 * attempt to play the video. If the state is false and the video is playing, it will pause
 * the video. The function also manages a custom `data-playing` attribute on the video element
 * to track the playback state.
 */
export const videoPlayControl = async (
  videoElement: HTMLVideoElement,
  state: boolean,
  currentTime?: number
): Promise<void> => {
  if (state && videoElement.paused) {
    const isPlaying = toBoolean(videoElement.dataset.playing ?? '')
    if (isPlaying) return

    const playPromise = videoElement.play()
    if (playPromise === undefined) return

    try {
      await playPromise
      videoElement.currentTime = currentTime || 0
      videoElement.dataset.playing = 'true'
    } catch {
      // Video play was interrupted (e.g., by user interaction or another play request)
    }
  }

  if (!state) {
    videoElement.pause()
    videoElement.dataset.playing = 'false'
  }
}
