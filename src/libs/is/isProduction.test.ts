import { isProduction } from './isProduction'

describe('isProduction', () => {
  it('should return true when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production'
    expect(isProduction()).toBe(true)
  })

  it('should return false when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'development'
    expect(isProduction()).toBe(false)
  })

  it('should return false when NODE_ENV is undefined', () => {
    process.env.NODE_ENV = undefined
    expect(isProduction()).toBe(false)
  })
})
