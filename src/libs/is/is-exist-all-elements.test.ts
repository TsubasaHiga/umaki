import { isExistAllElements } from './is-exist-all-elements'

describe('isExistAllElements', () => {
  it('should return true when all elements are non-null', () => {
    const elements = [
      document.createElement('div'),
      document.createElement('span')
    ]
    expect(isExistAllElements(elements)).toBe(true)
  })

  it('should return false when there is a null element', () => {
    const elements = [document.createElement('div'), null]
    expect(isExistAllElements(elements)).toBe(false)
  })

  it('should return false when the array is empty', () => {
    const elements: (HTMLElement | null)[] = []
    expect(isExistAllElements(elements)).toBe(false)
  })

  it('should return true when there is one non-null element', () => {
    const elements = [document.createElement('div')]
    expect(isExistAllElements(elements)).toBe(true)
  })

  it('should return false when all elements are null', () => {
    const elements = [null, null]
    expect(isExistAllElements(elements)).toBe(false)
  })
})
