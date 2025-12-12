import { jsonStringToJsonObject } from './json-string-to-json-object'

describe('jsonStringToJsonObject', () => {
  it('should parse a valid JSON string', () => {
    const jsonString = '{"name": "John", "age": 30}'
    const result = jsonStringToJsonObject(jsonString)
    expect(result).toEqual({ name: 'John', age: 30 })
  })

  it('should return undefined for an invalid JSON string', () => {
    const invalidJsonString = '{"name": "John", "age": 30'
    const result = jsonStringToJsonObject(invalidJsonString)
    expect(result).toBeUndefined()
  })

  it('should return undefined for an empty string', () => {
    const emptyString = ''
    const result = jsonStringToJsonObject(emptyString)
    expect(result).toBeUndefined()
  })

  it('should return undefined for a non-JSON string', () => {
    const nonJsonString = 'Hello, World!'
    const result = jsonStringToJsonObject(nonJsonString)
    expect(result).toBeUndefined()
  })
})
