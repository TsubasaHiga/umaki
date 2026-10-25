import type { ParseOptions } from 'query-string'
import { getQueryParams } from './get-query-params'

describe('getQueryParams', () => {
  let originalLocation: Location

  beforeEach(() => {
    originalLocation = window.location
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { search: '' }
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation
    })
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
    const result = getQueryParams('test', {
      parseOptions: { parseNumbers: false }
    })
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
      parseOptions: {
        arrayFormat: 'bracket-separator',
        arrayFormatSeparator: '|'
      }
    })
    expect(result).toEqual([1, 2, 3])
  })

  it('should work with custom search string', () => {
    const result = getQueryParams('test', { searchString: '?test=123' })
    expect(result).toBe(123)
  })

  it('should work with custom search string and parse options', () => {
    const result = getQueryParams('test', {
      searchString: '?test=123',
      parseOptions: { parseNumbers: false }
    })
    expect(result).toBe('123')
  })

  it('should return all values of a repeated key as an array', () => {
    expect(getQueryParams('a', { searchString: '?a=1&a=2' })).toEqual([1, 2])
  })

  it('should decode malformed percent-encoding without throwing', () => {
    // Invalid UTF-8 bytes become U+FFFD, like URLSearchParams
    expect(getQueryParams('a', { searchString: '?a=%E0%A4%A' })).toBe(
      '\ufffd%A'
    )
    expect(getQueryParams('a', { searchString: '?a=%' })).toBe('%')
    expect(getQueryParams('a', { searchString: '?a=100%25' })).toBe('100%')
  })

  it('should parse long malformed input in reasonable time', () => {
    const searchString = `?a=${'%E0%A4%A'.repeat(3000)}`
    const start = performance.now()
    getQueryParams('a', { searchString })
    expect(performance.now() - start).toBeLessThan(1000)
  })
})

describe('getQueryParams (SSR)', () => {
  it('should be safe in SSR environment (window undefined)', () => {
    vi.stubGlobal('window', undefined)
    try {
      expect(getQueryParams('a')).toBeNull()
    } finally {
      vi.unstubAllGlobals()
    }
  })
})

describe('getQueryParams (types)', () => {
  const searchString = '?a=1'

  it('should keep the default return type when parseOptions is omitted', () => {
    expectTypeOf(getQueryParams('a', { searchString })).toEqualTypeOf<
      string | number | (string | number | null)[] | null
    >()
  })

  it('should follow parseNumbers / parseBooleans / types in parseOptions', () => {
    expectTypeOf(
      getQueryParams('a', {
        searchString,
        parseOptions: { parseNumbers: false }
      })
    ).toEqualTypeOf<string | (string | null)[] | null>()
    expectTypeOf(
      getQueryParams('a', {
        searchString,
        parseOptions: { parseBooleans: true }
      })
    ).toEqualTypeOf<
      string | number | boolean | (string | number | boolean | null)[] | null
    >()
    expectTypeOf(
      getQueryParams('a', {
        searchString,
        parseOptions: { parseNumbers: false, types: { a: 'boolean' } }
      })
    ).toEqualTypeOf<string | boolean | (string | boolean | null)[] | null>()
  })

  it('should include boolean and number for a non-literal ParseOptions', () => {
    const parseOptions: ParseOptions = { parseBooleans: true }
    expectTypeOf(
      getQueryParams('a', { searchString, parseOptions })
    ).toEqualTypeOf<unknown>()
    const flags: Pick<ParseOptions, 'parseBooleans'> = {}
    expectTypeOf(
      getQueryParams('a', { searchString, parseOptions: flags })
    ).toEqualTypeOf<
      string | number | boolean | (string | number | boolean | null)[] | null
    >()
  })

  it('should return booleans at runtime with parseBooleans', () => {
    expect(
      getQueryParams('a', {
        searchString: '?a=true',
        parseOptions: { parseBooleans: true }
      })
    ).toBe(true)
  })
})
