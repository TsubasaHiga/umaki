/**
 * Configuration options for the umaki library
 */
export interface UmakiConfig {
  /**
   * Breakpoint value in pixels used for responsive design functions
   * @default 768
   */
  BREAKPOINT: number

  /**
   * Any additional custom configuration properties
   */
  [key: string]: unknown
}