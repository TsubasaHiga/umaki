import { getRenderedLineHeight } from './get-rendered-line-height'

describe('getRenderedLineHeight', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
    vi.restoreAllMocks()
  })

  /**
   * Helper to mock getBoundingClientRect so that any element returns the given
   * height. The function only reads `height`, so other rect fields are stubbed
   * with zeros to keep the test focused.
   */
  const mockProbeHeight = (height: number): void => {
    Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      height,
      width: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({})
    } as DOMRect)
  }

  it('returns the probe height divided by the sample lines (default 20)', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530) // 530 / 20 = 26.5

    expect(getRenderedLineHeight(element)).toBe(26.5)
  })

  it('uses the provided sampleLines option to compute the average line height', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(80) // 80 / 4 = 20

    expect(getRenderedLineHeight(element, { sampleLines: 4 })).toBe(20)
  })

  it('clamps sampleLines below 2 to a minimum of 2', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(60) // 60 / 2 = 30

    expect(getRenderedLineHeight(element, { sampleLines: 1 })).toBe(30)
    expect(getRenderedLineHeight(element, { sampleLines: 0 })).toBe(30)
    expect(getRenderedLineHeight(element, { sampleLines: -10 })).toBe(30)
  })

  it('floors fractional sampleLines values', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(75) // floor(5.9) = 5 → 75 / 5 = 15

    expect(getRenderedLineHeight(element, { sampleLines: 5.9 })).toBe(15)
  })

  it('falls back to the default sampleLines (20) for non-finite input', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(400) // 400 / 20 = 20

    expect(
      getRenderedLineHeight(element, { sampleLines: Number.POSITIVE_INFINITY })
    ).toBe(20)
    expect(
      getRenderedLineHeight(element, { sampleLines: Number.NEGATIVE_INFINITY })
    ).toBe(20)
    expect(getRenderedLineHeight(element, { sampleLines: Number.NaN })).toBe(20)
  })

  it('caps sampleLines at the maximum (100) to avoid excessive DOM nodes', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(1500) // 1500 / 100 = 15

    expect(getRenderedLineHeight(element, { sampleLines: 1_000_000 })).toBe(15)
  })

  it('returns NaN and removes the probe when measurement throws', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    Element.prototype.getBoundingClientRect = vi.fn(() => {
      throw new Error('measurement failed')
    })

    const initialChildren = document.body.childElementCount
    expect(getRenderedLineHeight(element)).toBeNaN()
    expect(document.body.childElementCount).toBe(initialChildren)
  })

  it('returns NaN when ownerDocument.defaultView is null', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    Object.defineProperty(element, 'ownerDocument', {
      value: { body: document.body, defaultView: null },
      configurable: true
    })

    expect(getRenderedLineHeight(element)).toBeNaN()
  })

  it('returns NaN when window is undefined (SSR safety)', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530)

    vi.stubGlobal('window', undefined)
    try {
      expect(getRenderedLineHeight(element)).toBeNaN()
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('returns NaN when the probe height is 0', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(0)

    expect(getRenderedLineHeight(element)).toBeNaN()
  })

  it('returns NaN when the probe height is negative', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(-1)

    expect(getRenderedLineHeight(element)).toBeNaN()
  })

  it('returns NaN when the element has no ownerDocument body', () => {
    const element = document.createElement('div')
    Object.defineProperty(element, 'ownerDocument', {
      value: { body: null },
      configurable: true
    })

    expect(getRenderedLineHeight(element)).toBeNaN()
  })

  it('removes the probe element from the DOM after measurement', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530)

    const initialChildren = document.body.childElementCount
    getRenderedLineHeight(element)

    expect(document.body.childElementCount).toBe(initialChildren)
  })

  it('copies key font and line-height styles from the source element to the probe', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530)

    const fakeComputed = {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fontWeight: '700',
      fontStyle: 'italic',
      lineHeight: '26.5px',
      letterSpacing: '0.5px',
      fontFeatureSettings: '"liga" 1',
      fontVariationSettings: '"wght" 600'
    } as unknown as CSSStyleDeclaration

    const getComputedStyleSpy = vi
      .spyOn(window, 'getComputedStyle')
      .mockReturnValue(fakeComputed)

    const appendChildSpy = vi.spyOn(document.body, 'appendChild')

    getRenderedLineHeight(element)

    expect(getComputedStyleSpy).toHaveBeenCalledWith(element)
    const probe = appendChildSpy.mock.calls[0]?.[0] as HTMLElement
    expect(probe).toBeDefined()
    expect(probe.style.fontFamily).toBe('Arial, sans-serif')
    expect(probe.style.fontSize).toBe('16px')
    expect(probe.style.fontWeight).toBe('700')
    expect(probe.style.fontStyle).toBe('italic')
    expect(probe.style.lineHeight).toBe('26.5px')
    expect(probe.style.letterSpacing).toBe('0.5px')
    expect(probe.style.fontFeatureSettings).toBe('"liga" 1')
    expect(probe.style.fontVariationSettings).toBe('"wght" 600')
    expect(probe.style.position).toBe('absolute')
    expect(probe.style.visibility).toBe('hidden')
    expect(probe.style.whiteSpace).toBe('pre')
  })

  it('omits fontVariationSettings on the probe when the computed value is empty', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530)

    const fakeComputed = {
      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: '400',
      fontStyle: 'normal',
      lineHeight: '24px',
      letterSpacing: 'normal',
      fontFeatureSettings: 'normal',
      fontVariationSettings: ''
    } as unknown as CSSStyleDeclaration

    vi.spyOn(window, 'getComputedStyle').mockReturnValue(fakeComputed)

    const appendChildSpy = vi.spyOn(document.body, 'appendChild')

    getRenderedLineHeight(element)

    const probe = appendChildSpy.mock.calls[0]?.[0] as HTMLElement
    expect(probe.style.fontVariationSettings).toBe('')
  })

  it('inserts sampleLines lines worth of <br> separators in the probe', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    mockProbeHeight(530)

    const appendChildSpy = vi.spyOn(document.body, 'appendChild')

    getRenderedLineHeight(element, { sampleLines: 5 })

    const probe = appendChildSpy.mock.calls[0]?.[0] as HTMLElement
    const brCount = probe.querySelectorAll('br').length
    expect(brCount).toBe(4)
  })
})
