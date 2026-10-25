// runes2 splits combining marks (e.g. 'é'), so use Intl.Segmenter for grapheme clusters
// Created lazily so that importing umaki does not throw where Intl.Segmenter is unavailable
let segmenter: Intl.Segmenter | undefined

/** Splits a string into grapheme clusters (user-perceived characters). Internal, not exported. */
export const splitGraphemes = (value: string): string[] => {
  segmenter ??= new Intl.Segmenter(undefined, { granularity: 'grapheme' })
  return Array.from(segmenter.segment(value), ({ segment }) => segment)
}
