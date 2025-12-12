import { set100vh } from './set-100vh'

describe('set100vh', () => {
  it('should set the CSS variable to 1% of the window innerHeight', () => {
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true
    })

    set100vh()

    const expectedValue = `${window.innerHeight * 0.01}px`
    const styleValue = document.documentElement.style.getPropertyValue('--vh')
    expect(styleValue).toBe(expectedValue)
  })

  it('should set the CSS variable to a custom property name', () => {
    // Mock window.innerHeight
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true
    })

    const customProperty = '--custom-vh'
    set100vh(customProperty)

    const expectedValue = `${window.innerHeight * 0.01}px`
    const styleValue =
      document.documentElement.style.getPropertyValue(customProperty)
    expect(styleValue).toBe(expectedValue)
  })
})
