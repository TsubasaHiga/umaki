import { isTouchSupport } from './isTouchSupport'

describe('isTouchSupport', () => {
  // Store the original values to restore later
  const originalOnTouchStart = Object.getOwnPropertyDescriptor(window, 'ontouchstart') || { value: undefined, configurable: true }
  const originalMaxTouchPoints = Object.getOwnPropertyDescriptor(navigator, 'maxTouchPoints') || { value: undefined, configurable: true }
  
  // Setup/teardown
  afterEach(() => {
    // Restore original values
    Object.defineProperty(window, 'ontouchstart', originalOnTouchStart)
    Object.defineProperty(navigator, 'maxTouchPoints', originalMaxTouchPoints)
  })
  
  it('should return true if window has ontouchstart', () => {
    // Mock 'ontouchstart' to exist on window
    Object.defineProperty(window, 'ontouchstart', {
      value: null, // Just needs to exist, value doesn't matter
      configurable: true
    })
    
    // Mock maxTouchPoints to be 0 (no touch points)
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true
    })
    
    expect(isTouchSupport()).toBe(true)
  })

  it('should return true if navigator has maxTouchPoints > 0', () => {
    // Set ontouchstart to undefined
    Object.defineProperty(window, 'ontouchstart', {
      value: undefined,
      configurable: true
    })
    
    // Mock maxTouchPoints to be > 0
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 5,
      configurable: true
    })
    
    expect(isTouchSupport()).toBe(true)
  })

  it('should return false if device does not support touch', () => {
    // Set ontouchstart to undefined
    Object.defineProperty(window, 'ontouchstart', {
      value: undefined,
      configurable: true
    })
    
    // Mock maxTouchPoints to be 0 (no touch points)
    Object.defineProperty(navigator, 'maxTouchPoints', {
      value: 0,
      configurable: true
    })
    
    // Also mock msMaxTouchPoints to be 0 (for IE/Edge)
    Object.defineProperty(navigator, 'msMaxTouchPoints', {
      value: 0,
      configurable: true
    })
    
    expect(isTouchSupport()).toBe(false)
  })
})