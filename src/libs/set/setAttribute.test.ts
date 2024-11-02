import { setAttribute } from './setAttribute'

describe('setAttribute', () => {
  it('should set the attribute on the element', () => {
    const element = document.createElement('div') as unknown as HTMLElement

    setAttribute(element, 'id', 'test-id')
    expect(element.getAttribute('id')).toBe('test-id')
  })

  it('should overwrite the existing attribute value', () => {
    const element = document.createElement('div') as unknown as HTMLElement
    element.setAttribute('id', 'initial-id')

    setAttribute(element, 'id', 'new-id')
    expect(element.getAttribute('id')).toBe('new-id')
  })

  it('should set a new attribute if it does not exist', () => {
    const element = document.createElement('div') as unknown as HTMLElement

    setAttribute(element, 'class', 'test-class')
    expect(element.getAttribute('class')).toBe('test-class')
  })
})
