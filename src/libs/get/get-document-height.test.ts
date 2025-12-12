import { getDocumentHeight } from './get-document-height'

describe('getDocumentHeight', () => {
  it('should return the correct document height', () => {
    // Mock document.body.clientHeight and window.innerHeight
    Object.defineProperty(document.body, 'clientHeight', {
      value: 1000,
      writable: true
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true
    })

    const height = getDocumentHeight()
    expect(height).toBe(200)
  })

  it('should return 0 if document.body.clientHeight equals window.innerHeight', () => {
    // Mock document.body.clientHeight and window.innerHeight
    Object.defineProperty(document.body, 'clientHeight', {
      value: 800,
      writable: true
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true
    })

    const height = getDocumentHeight()
    expect(height).toBe(0)
  })

  it('should return a negative value if window.innerHeight is greater than document.body.clientHeight', () => {
    // Mock document.body.clientHeight and window.innerHeight
    Object.defineProperty(document.body, 'clientHeight', {
      value: 800,
      writable: true
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true
    })

    const height = getDocumentHeight()
    expect(height).toBe(-200)
  })
})
