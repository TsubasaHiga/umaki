import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setConfig } from '../config'
import { checkDeviceSize } from './check-device-size'

describe('checkDeviceSize', () => {
  const originalWindow = { ...window }

  beforeEach(() => {
    // Reset the window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1000
    })

    // Reset to default config
    setConfig({ BREAKPOINT: 768 })
  })

  afterEach(() => {
    // Restore original window
    vi.restoreAllMocks()
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: originalWindow.innerWidth
    })
  })

  it('should return "md" for window width larger than breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000 // Larger than default breakpoint (768)
    })

    expect(checkDeviceSize()).toBe('md')
  })

  it('should return "sm" for window width smaller than breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500 // Smaller than default breakpoint (768)
    })

    expect(checkDeviceSize()).toBe('sm')
  })

  it('should return "sm" for window width equal to breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768 // Equal to default breakpoint
    })

    expect(checkDeviceSize()).toBe('sm')
  })

  it('should use custom breakpoint value when configuration is updated', () => {
    // Set a custom breakpoint
    setConfig({ BREAKPOINT: 1200 })

    // Set window width between default breakpoint and custom breakpoint
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1000 // Larger than default (768) but smaller than custom (1200)
    })

    // Should now be 'sm' since we're below the new breakpoint
    expect(checkDeviceSize()).toBe('sm')
  })

  it('should return "md" for window width larger than custom breakpoint', () => {
    setConfig({ BREAKPOINT: 1200 })

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1400 // Larger than custom breakpoint (1200)
    })

    expect(checkDeviceSize()).toBe('md')
  })
})
