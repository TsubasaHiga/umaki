import { getParentList } from './getParentList'

describe('getParentList', () => {
  it('should return an array with the element itself if it has no parent', () => {
    const element = document.createElement('div') as unknown as HTMLElement
    const result = getParentList(element)
    expect(result).toEqual([element])
  })

  it('should return an array with the element and its parent elements', () => {
    const grandParent = document.createElement('div') as unknown as HTMLElement
    const parent = document.createElement('div') as unknown as HTMLElement
    const child = document.createElement('div') as unknown as HTMLElement

    grandParent.appendChild(parent)
    parent.appendChild(child)

    const result = getParentList(child)
    expect(result).toEqual([child, parent, grandParent])
  })

  it('should handle deeply nested elements', () => {
    const root = document.createElement('div') as unknown as HTMLElement
    let currentParent = root
    const elements = [root]

    for (let i = 0; i < 10; i++) {
      const newElement = document.createElement('div') as unknown as HTMLElement
      currentParent.appendChild(newElement)
      elements.push(newElement)
      currentParent = newElement
    }

    const result = getParentList(elements[elements.length - 1])
    expect(result).toEqual(elements.reverse())
  })
})
