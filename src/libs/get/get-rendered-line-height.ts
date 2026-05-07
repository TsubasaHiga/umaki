/**
 * Options for {@link getRenderedLineHeight}.
 */
export type GetRenderedLineHeightOptions = {
  /**
   * Number of lines used to measure the rendered line-height. Higher values
   * yield a more precise per-line average. Clamped to the range [2, 100];
   * non-finite values fall back to the default.
   *
   * @default 20
   */
  sampleLines?: number
}

const DEFAULT_SAMPLE_LINES = 20
const MIN_SAMPLE_LINES = 2
const MAX_SAMPLE_LINES = 100

const normalizeSampleLines = (value: number | undefined): number => {
  const raw = value ?? DEFAULT_SAMPLE_LINES
  if (!Number.isFinite(raw)) return DEFAULT_SAMPLE_LINES
  return Math.min(MAX_SAMPLE_LINES, Math.max(MIN_SAMPLE_LINES, Math.floor(raw)))
}

/**
 * Measures the line-height as it is actually rendered (in CSS pixels) for the
 * given element.
 *
 * On iOS Safari, fractional `line-height` values are floored to integer pixels
 * at paint time, which makes `getComputedStyle(...).lineHeight` and the
 * `1lh` unit drift from the visual baseline. This function inserts a hidden
 * probe element with the same font/line-height related styles, measures the
 * total height across multiple lines, and divides by the line count to obtain
 * the actually rendered per-line height.
 *
 * Returns `NaN` in non-DOM environments (SSR), or when the probe cannot be
 * measured (no body, no defaultView, zero/negative height, or measurement
 * exception).
 *
 * The caller is responsible for waiting on `document.fonts.ready` before
 * calling this function when accurate font-loaded measurements matter.
 *
 * @param element - The element whose rendered line-height should be measured.
 * @param options - Measurement options.
 * @returns The rendered line-height in CSS pixels, or `NaN` when measurement
 *   is not possible.
 */
export const getRenderedLineHeight = (
  element: HTMLElement,
  options?: GetRenderedLineHeightOptions
): number => {
  if (typeof window === 'undefined') return Number.NaN

  const sampleLines = normalizeSampleLines(options?.sampleLines)

  const ownerDocument = element.ownerDocument
  const host = ownerDocument?.body
  const view = ownerDocument?.defaultView
  if (!host || !view) return Number.NaN

  const cs = view.getComputedStyle(element)

  const probe = ownerDocument.createElement('div')
  const style = probe.style
  style.position = 'absolute'
  style.left = '-9999px'
  style.top = '0'
  style.visibility = 'hidden'
  style.pointerEvents = 'none'
  style.margin = '0'
  style.padding = '0'
  style.border = '0'
  style.whiteSpace = 'pre'
  style.fontFamily = cs.fontFamily
  style.fontSize = cs.fontSize
  style.fontWeight = cs.fontWeight
  style.fontStyle = cs.fontStyle
  style.lineHeight = cs.lineHeight
  style.letterSpacing = cs.letterSpacing
  style.fontFeatureSettings = cs.fontFeatureSettings
  if (cs.fontVariationSettings) {
    style.fontVariationSettings = cs.fontVariationSettings
  }

  for (let i = 0; i < sampleLines; i++) {
    if (i > 0) probe.appendChild(ownerDocument.createElement('br'))
    probe.appendChild(ownerDocument.createTextNode('X'))
  }

  host.appendChild(probe)

  try {
    const probeHeight = probe.getBoundingClientRect().height
    if (probeHeight <= 0) return Number.NaN
    return probeHeight / sampleLines
  } catch {
    return Number.NaN
  } finally {
    if (probe.parentNode === host) {
      host.removeChild(probe)
    }
  }
}
