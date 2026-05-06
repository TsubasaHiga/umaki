import { defaultConfig } from './default-config'
import type { UmakiConfig } from './types'

/**
 * Internal module for shared configuration state.
 * This module should NOT be exported publicly.
 */

// The current configuration, starting with the default values
export const currentConfig: UmakiConfig = { ...defaultConfig }
