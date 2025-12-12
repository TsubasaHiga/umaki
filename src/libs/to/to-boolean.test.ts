import { toBoolean } from './to-boolean'

describe('toBoolean', () => {
  it('should return true for "true"', () => {
    expect(toBoolean('true')).toBe(true)
  })

  it('should return true for "TRUE"', () => {
    expect(toBoolean('TRUE')).toBe(true)
  })

  it('should return true for "TrUe"', () => {
    expect(toBoolean('TrUe')).toBe(true)
  })

  it('should return false for "false"', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it('should return false for "FALSE"', () => {
    expect(toBoolean('FALSE')).toBe(false)
  })

  it('should return false for "FaLsE"', () => {
    expect(toBoolean('FaLsE')).toBe(false)
  })

  it('should return false for null', () => {
    expect(toBoolean(null)).toBe(false)
  })

  it('should return false for an empty string', () => {
    expect(toBoolean('')).toBe(false)
  })

  it('should return false for any other string', () => {
    expect(toBoolean('random')).toBe(false)
  })
})
