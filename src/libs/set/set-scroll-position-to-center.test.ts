import { setScrollPositionToCenter } from './set-scroll-position-to-center'

describe('setScrollPositionToCenter', () => {
  let rootElement: HTMLElement
  let targetElement: HTMLElement

  beforeEach(() => {
    rootElement = document.createElement('div') as unknown as HTMLElement
    targetElement = document.createElement('div') as unknown as HTMLElement

    // Set styles to simulate dimensions
    Object.assign(rootElement.style, {
      width: '500px',
      overflow: 'auto',
      position: 'relative'
    })

    Object.assign(targetElement.style, {
      width: '100px',
      position: 'absolute'
    })

    // Append targetElement to rootElement
    rootElement.appendChild(targetElement)
    document.body.appendChild(rootElement)
  })

  it('should set the scroll position to center with smooth behavior', () => {
    targetElement.style.left = '200px' // Simulate position
    setScrollPositionToCenter(rootElement, targetElement, 'smooth')

    const rootHalfW = rootElement.getBoundingClientRect().width / 2
    const buttonHalfW = targetElement.getBoundingClientRect().width / 2
    const currentPosLeft = targetElement.offsetLeft + buttonHalfW
    const expectedPosLeft = currentPosLeft - rootHalfW

    expect(rootElement.scrollLeft).toBe(expectedPosLeft)
  })

  it('should set the scroll position to center with auto behavior', () => {
    targetElement.style.left = '300px' // Simulate position
    setScrollPositionToCenter(rootElement, targetElement, 'auto')

    const rootHalfW = rootElement.getBoundingClientRect().width / 2
    const buttonHalfW = targetElement.getBoundingClientRect().width / 2
    const currentPosLeft = targetElement.offsetLeft + buttonHalfW
    const expectedPosLeft = currentPosLeft - rootHalfW

    expect(rootElement.scrollLeft).toBe(expectedPosLeft)
  })
})
