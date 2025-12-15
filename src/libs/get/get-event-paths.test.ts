import { getEventPaths } from './get-event-paths'

describe('getEventPaths', () => {
  it('should return path including window when composedPath is available', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const event = new MouseEvent('click', { bubbles: true })
    div.dispatchEvent(event)

    const paths = getEventPaths(event)

    expect(paths).toContain(div)
    expect(paths).toContain(window)
  })

  it('should append window to path if not included by composedPath', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'composedPath', {
      value: () => [div, document.body, document.documentElement, document]
    })
    div.dispatchEvent(event)

    const paths = getEventPaths(event)

    expect(paths).toContain(window)
    expect(paths[paths.length - 1]).toBe(window)
  })

  it('should not duplicate window if already included in composedPath', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'composedPath', {
      value: () => [
        div,
        document.body,
        document.documentElement,
        document,
        window
      ]
    })
    div.dispatchEvent(event)

    const paths = getEventPaths(event)

    const windowCount = paths.filter((p) => p === window).length
    expect(windowCount).toBe(1)
  })

  it('should return path with window when target is Window and composedPath returns null', () => {
    const event = new Event('resize')
    Object.defineProperty(event, 'composedPath', {
      value: () => null
    })
    // In happy-dom, window instanceof Window returns false
    // so we test that window is at least included in the result
    Object.defineProperty(event, 'target', {
      value: window,
      writable: false
    })

    const paths = getEventPaths(event)

    expect(paths).toContain(window)
    expect(paths[paths.length - 1]).toBe(window)
  })

  it('should manually traverse DOM tree when composedPath is not available', () => {
    const grandparent = document.createElement('div')
    const parent = document.createElement('div')
    const child = document.createElement('div')

    grandparent.appendChild(parent)
    parent.appendChild(child)
    document.body.appendChild(grandparent)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'composedPath', {
      value: undefined
    })
    Object.defineProperty(event, 'target', {
      value: child,
      writable: false
    })

    const paths = getEventPaths(event)

    expect(paths[0]).toBe(child)
    expect(paths).toContain(parent)
    expect(paths).toContain(grandparent)
    expect(paths[paths.length - 1]).toBe(window)
  })

  it('should handle element with no parent when composedPath is not available', () => {
    const orphanElement = document.createElement('div')

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'composedPath', {
      value: undefined
    })
    Object.defineProperty(event, 'target', {
      value: orphanElement,
      writable: false
    })

    const paths = getEventPaths(event)

    expect(paths[0]).toBe(orphanElement)
    expect(paths[paths.length - 1]).toBe(window)
  })
})
