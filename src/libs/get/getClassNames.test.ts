import { getClassNames } from './getClassNames'

describe('getClassNames', () => {
  it('should return an array of class names from the target element', () => {
    const element = document.createElement('div')
    element.className = 'class1 class2 class3'
    const result = getClassNames(element)
    expect(result).toEqual(['class1', 'class2', 'class3'])
  })

  it('should return an empty array if the target element has no class names', () => {
    const element = document.createElement('div')
    const result = getClassNames(element)
    expect(result).toEqual([])
  })

  it('should handle multiple spaces between class names', () => {
    const element = document.createElement('div')
    element.className = 'class1   class2  class3'
    const result = getClassNames(element)
    expect(result).toEqual(['class1', 'class2', 'class3'])
  })

  it('should handle leading and trailing spaces in class names', () => {
    const element = document.createElement('div')
    element.className = '  class1 class2 class3  '
    const result = getClassNames(element)
    expect(result).toEqual(['class1', 'class2', 'class3'])
  })
})
