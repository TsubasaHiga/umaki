import { getQueryParams } from './getQueryParams'

describe('getQueryParams', () => {
  let originalLocation: Location

  beforeEach(() => {
    originalLocation = window.location
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { search: '' } as Location
    })
    window.location = { search: '' } as Location
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it('should return null if no query parameters are present', () => {
    window.location.search = ''
    const result = getQueryParams('test')
    expect(result).toBeNull()
  })

  it('should return null if the specified query parameter is not present', () => {
    window.location.search = '?other=123'
    const result = getQueryParams('test')
    expect(result).toBeNull()
  })

  it('should return the value of the specified query parameter', () => {
    window.location.search = '?test=123'
    const result = getQueryParams('test', { parseNumbers: false })
    expect(result).toBe('123')
  })

  it('should return the value as a number if parseNumbers is true', () => {
    window.location.search = '?test=123'
    const result = getQueryParams('test')
    expect(result).toBe(123)
  })

  it('should return an array if the query parameter is an array', () => {
    window.location.search = '?test=1,2,3'
    const result = getQueryParams('test')
    expect(result).toEqual([1, 2, 3])
  })

  it('should respect custom parse options', () => {
    window.location.search = '?test[]=1|2|3'
    const result = getQueryParams('test', {
      arrayFormat: 'bracket-separator',
      arrayFormatSeparator: '|'
    })
    expect(result).toEqual([1, 2, 3])
  })
})
