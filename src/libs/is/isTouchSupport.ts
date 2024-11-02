import isTouchDevice from 'is-touch-device'

/**
 * Determines if the device supports touch input.
 *
 * @returns {boolean} True if the device supports touch input, otherwise false.
 */
export const isTouchSupport = (): boolean => isTouchDevice()
