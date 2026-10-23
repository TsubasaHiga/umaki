import { currentConfig } from './_internal'
import type { UmakiConfig } from './types'

// Assigning these keys would change the prototype of the config object
const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Set or update the configuration
 * @param config - Configuration object with values to update
 * @returns The updated configuration object
 * `__proto__`, `constructor` and `prototype` keys are ignored.
 */
export const setConfig = (config: Partial<UmakiConfig>): UmakiConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (UNSAFE_KEYS.has(key)) continue
    currentConfig[key] = value
  }
  return { ...currentConfig }
}
