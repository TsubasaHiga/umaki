import { beforeEach, describe, expect, it } from 'vitest'
import { defaultConfig } from './default-config'
import { getConfig, getConfigValue, setConfig } from './index'

describe('config', () => {
  beforeEach(() => {
    // Reset to default configuration before each test
    setConfig({ ...defaultConfig })
  })

  it('should return the default configuration', () => {
    const config = getConfig()
    expect(config).toEqual(defaultConfig)
  })

  it('should update the configuration with setConfig', () => {
    const newBreakpoint = 1024
    setConfig({ BREAKPOINT: newBreakpoint })

    const config = getConfig()
    expect(config.BREAKPOINT).toEqual(newBreakpoint)
  })

  it('should allow adding custom configuration properties', () => {
    const customConfig = { customValue: 'test' }
    setConfig(customConfig)

    const config = getConfig()
    expect(config.customValue).toEqual('test')
  })

  it('should get a specific configuration value with getConfigValue', () => {
    const value = getConfigValue('BREAKPOINT')
    expect(value).toEqual(defaultConfig.BREAKPOINT)
  })

  it('should update a specific configuration value and retrieve it with getConfigValue', () => {
    const newBreakpoint = 1200
    setConfig({ BREAKPOINT: newBreakpoint })

    const value = getConfigValue('BREAKPOINT')
    expect(value).toEqual(newBreakpoint)
  })

  it('should ignore __proto__, constructor and prototype keys', () => {
    const malicious = JSON.parse(
      '{"__proto__": {"polluted": true}, "constructor": 1, "prototype": 2, "BREAKPOINT": 999}'
    )
    const result = setConfig(malicious)

    expect(result.BREAKPOINT).toBe(999)
    expect(Object.getPrototypeOf(getConfig())).toBe(Object.prototype)
    expect((getConfig() as Record<string, unknown>).polluted).toBeUndefined()
    expect(Object.hasOwn(getConfig(), 'constructor')).toBe(false)
    expect(Object.hasOwn(getConfig(), 'prototype')).toBe(false)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})
