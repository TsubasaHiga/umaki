import { copyToClipboard } from './copy-to-clipboard'

describe('copyToClipboard', () => {
  const originalNavigator = global.navigator

  afterEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true
    })
    vi.restoreAllMocks()
  })

  it('should return true when clipboard write succeeds', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWriteText
        }
      },
      writable: true,
      configurable: true
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('test text')
  })

  it('should return false when clipboard write fails', async () => {
    const mockWriteText = vi.fn().mockRejectedValue(new Error('Failed'))
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWriteText
        }
      },
      writable: true,
      configurable: true
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(false)
  })

  it('should return false when navigator is undefined', async () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(false)
  })

  it('should return false when clipboard API is not available', async () => {
    Object.defineProperty(global, 'navigator', {
      value: {},
      writable: true,
      configurable: true
    })

    const result = await copyToClipboard('test text')

    expect(result).toBe(false)
  })

  it('should handle empty string', async () => {
    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(global, 'navigator', {
      value: {
        clipboard: {
          writeText: mockWriteText
        }
      },
      writable: true,
      configurable: true
    })

    const result = await copyToClipboard('')

    expect(result).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('')
  })
})
