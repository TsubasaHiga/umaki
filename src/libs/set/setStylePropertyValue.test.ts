import { setStylePropertyValue } from './setStylePropertyValue'

describe('setStylePropertyValue', () => {
  it('should set the CSS custom property on the document element', () => {
    const key = '--custom-color'
    const value = 'blue'

    setStylePropertyValue(key, value)

    const styleValue = document.documentElement.style.getPropertyValue(key)
    expect(styleValue).toBe(value)
  })

  it('should overwrite the existing CSS custom property value', () => {
    const key = '--custom-color'
    const initialValue = 'red'
    const newValue = 'green'

    setStylePropertyValue(key, initialValue)
    setStylePropertyValue(key, newValue)

    const styleValue = document.documentElement.style.getPropertyValue(key)
    expect(styleValue).toBe(newValue)
  })
})
