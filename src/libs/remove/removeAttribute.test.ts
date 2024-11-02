import { removeAttribute } from './removeAttribute'

describe('removeAttribute', () => {
  it('should remove the specified attribute from the element', () => {
    const element = document.createElement('div')
    element.setAttribute('data-test', 'value')

    removeAttribute(element, 'data-test')

    expect(element.hasAttribute('data-test')).toBe(false)
  })

  it('should do nothing if the attribute does not exist', () => {
    const element = document.createElement('div')

    removeAttribute(element, 'non-existent-attribute')

    expect(element.hasAttribute('non-existent-attribute')).toBe(false)
  })
})
