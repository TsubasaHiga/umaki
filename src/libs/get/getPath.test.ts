import { getPath } from './getPath'

describe('getPath', () => {
  const originalBaseUrl = import.meta.env.BASE_URL

  beforeEach(() => {
    import.meta.env.BASE_URL = '/base/'
  })

  it('should return the correct path when a valid pathName is provided', () => {
    const pathName = 'test/path'
    const result = getPath(pathName)
    expect(result).toBe('/base/test/path')
  })

  it('should handle an empty pathName', () => {
    const pathName = ''
    const result = getPath(pathName)
    expect(result).toBe('/base/')
  })

  afterEach(() => {
    import.meta.env.BASE_URL = originalBaseUrl
  })
})
