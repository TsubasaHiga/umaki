import { currentConfig } from './getConfig'
import type { UmakiConfig } from './types'

/**
 * Set or update the configuration
 * @param config - Configuration object with values to update
 * @returns The updated configuration object
 */
export const setConfig = (config: Partial<UmakiConfig>): UmakiConfig => {
  // Update the current configuration with the new values
  Object.assign(currentConfig, config)
  return { ...currentConfig }
}