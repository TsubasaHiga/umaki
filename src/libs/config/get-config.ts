import { currentConfig } from './_internal'
import type { UmakiConfig } from './types'

/**
 * Get the current configuration
 * @returns The current configuration object
 */
export const getConfig = (): UmakiConfig => {
  return { ...currentConfig }
}

/**
 * Get a specific configuration value by key
 * @param key - The configuration key to retrieve
 * @returns The value for the specified key, or undefined if the key doesn't exist
 */
export const getConfigValue = <K extends keyof UmakiConfig>(
  key: K
): UmakiConfig[K] => {
  return currentConfig[key]
}
