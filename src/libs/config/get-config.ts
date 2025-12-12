import { defaultConfig } from './default-config'
import type { UmakiConfig } from './types'

// The current configuration, starting with the default values
const currentConfig: UmakiConfig = { ...defaultConfig }

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

// Export for internal use by setConfig
export { currentConfig }
