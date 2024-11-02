import { getScrollbarWidth } from './getScrollbarWidth'

describe('getScrollbarWidth', () => {
  it('should return the correct scrollbar width', () => {
    // Set up the document body with a specific width
    window.innerWidth = 1024
    document.body.style.width = '100px'

    // Append the body to the document
    document.appendChild(document.body)

    // Calculate the expected scrollbar width
    const expectedScrollbarWidth = window.innerWidth - document.body.clientWidth

    // Call the function and check the result
    expect(getScrollbarWidth()).toBe(expectedScrollbarWidth)
  })
})
