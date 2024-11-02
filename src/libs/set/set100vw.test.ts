import { set100vw } from './set100vw'

describe('set100vw', () => {
  it('should set the CSS variable to the clientWidth of the document', () => {
    // Mock clientWidth
    const mockClientWidth = 1024
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: mockClientWidth,
      writable: true
    })

    set100vw('--vw')

    const styleValue = document.documentElement.style.getPropertyValue('--vw')
    expect(styleValue).toBe(`${mockClientWidth}px`)
  })

  it('should set the CSS variable to the specified property name', () => {
    // Mock clientWidth
    const mockClientWidth = 768
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: mockClientWidth,
      writable: true
    })

    const customProperty = '--custom-vw'
    set100vw(customProperty)

    const styleValue =
      document.documentElement.style.getPropertyValue(customProperty)
    expect(styleValue).toBe(`${mockClientWidth}px`)
  })
})
