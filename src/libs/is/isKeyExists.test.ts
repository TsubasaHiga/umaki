import { isKeyExists } from './isKeyExists'

describe('isKeyExists', () => {
  it('should return true if the key exists in the object', () => {
    const obj = { a: 1, b: 2 }
    const result = obj ? isKeyExists(obj, 'a') : false
    expect(result).toBe(true)
  })

  it('should return false if the key does not exist in the object', () => {
    const obj = { a: 1, b: 2 }
    const result = isKeyExists(obj, 'c')
    expect(result).toBe(false)
  })

  it('should return false if the object is empty', () => {
    const obj = {}
    const result = isKeyExists(obj, 'a')
    expect(result).toBe(false)
  })

  it('should return false if the object is null', () => {
    const obj = null
    const result = obj ? isKeyExists(obj, 'a') : false
    expect(result).toBe(false)
  })

  it('should return false if the object is undefined', () => {
    const obj = undefined
    const result = obj ? isKeyExists(obj, 'a') : false
    expect(result).toBe(false)
  })
})
