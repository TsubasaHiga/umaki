import { getScrollbarWidth } from '@libs/get/get-scrollbar-width'
import { bgScrollStop } from './bg-scroll-stop'

vi.mock('@libs/get/get-scrollbar-width')

describe('bgScrollStop', () => {
  beforeEach(() => {
    document.body.style.paddingRight = ''
    document.body.style.overflow = ''
    vi.mocked(getScrollbarWidth).mockReturnValue(15)
  })

  it('should stop background scrolling by default (isStop=true)', () => {
    bgScrollStop()

    expect(document.body.style.paddingRight).toBe('15px')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should stop background scrolling when isStop is true', () => {
    bgScrollStop(true)

    expect(document.body.style.paddingRight).toBe('15px')
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('should resume background scrolling when isStop is false', () => {
    document.body.style.paddingRight = '15px'
    document.body.style.overflow = 'hidden'

    bgScrollStop(false)

    expect(document.body.style.paddingRight).toBe('')
    expect(document.body.style.overflow).toBe('')
  })

  it('should use scrollbar width from getScrollbarWidth', () => {
    vi.mocked(getScrollbarWidth).mockReturnValue(20)

    bgScrollStop(true)

    expect(document.body.style.paddingRight).toBe('20px')
    expect(getScrollbarWidth).toHaveBeenCalled()
  })

  it('should handle zero scrollbar width', () => {
    vi.mocked(getScrollbarWidth).mockReturnValue(0)

    bgScrollStop(true)

    expect(document.body.style.paddingRight).toBe('0px')
    expect(document.body.style.overflow).toBe('hidden')
  })
})
