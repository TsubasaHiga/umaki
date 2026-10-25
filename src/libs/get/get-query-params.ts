import queryStringImport, { type ParseOptions } from 'query-string'

type QueryString = typeof queryStringImport

// query-string is ESM-only: when the CJS build loads it via require(esm), the default export is nested one level deeper
const queryString: QueryString =
  'parse' in queryStringImport
    ? queryStringImport
    : (queryStringImport as unknown as { default: QueryString }).default

// Default parsing options for query-string.
const queryStringOptions: ParseOptions = {
  arrayFormat: 'comma',
  parseNumbers: true
}

// Types that a `types` entry of ParseOptions converts a value to
type TypesValue<Type> = Type extends 'number' | 'number[]'
  ? number
  : Type extends 'boolean'
    ? boolean
    : Type extends (value: string) => infer Result
      ? Result
      : never

// Value of an option in `Options`, or undefined when it is not given
type OptionValue<
  Options extends ParseOptions,
  Key extends keyof ParseOptions
> = Key extends keyof Options ? Options[Key] : undefined

// A value parsed with the default options merged with `Options`; numbers are parsed unless `parseNumbers: false`
type ParsedValue<Options extends ParseOptions> =
  | string
  | (OptionValue<Options, 'parseNumbers'> extends false ? never : number)
  | (OptionValue<Options, 'parseBooleans'> extends false | undefined
      ? never
      : boolean)
  | (OptionValue<Options, 'types'> extends undefined
      ? never
      : NonNullable<OptionValue<Options, 'types'>> extends Record<
            string,
            infer Type
          >
        ? TypesValue<Type>
        : never)

export type GetQueryParamsReturnType<
  Options extends ParseOptions = Record<never, never>
> = ParsedValue<Options> | (ParsedValue<Options> | null)[] | null

export type GetQueryParamsOptions<
  Options extends ParseOptions = Record<never, never>
> = {
  searchString?: string
  parseOptions?: Options
}

/**
 * Retrieves the value of a specified query parameter from the URL.
 *
 * @param query - The name of the query parameter to retrieve.
 * @param options - Optional. An object containing searchString and parseOptions.
 * @returns The value of the query parameter, which can be a string, number, array of strings or numbers, or null if the parameter is not found.
 * The return type follows `parseOptions` (e.g. `parseBooleans: true` adds `boolean`, `parseNumbers: false` removes `number`).
 * A repeated key returns an array, and percent-encoded bytes that are not valid UTF-8 are decoded to `U+FFFD`.
 * In SSR environments where window is undefined, `searchString` defaults to an empty string.
 */
export const getQueryParams = <
  const Options extends ParseOptions = Record<never, never>
>(
  query: string,
  options: GetQueryParamsOptions<Options> = {}
): GetQueryParamsReturnType<Options> => {
  const {
    searchString = typeof window === 'undefined' ? '' : window.location.search,
    parseOptions
  } = options
  const queryOptions = {
    ...queryStringOptions,
    ...parseOptions
  }
  const queryParsed = queryString.parse(searchString, queryOptions)
  if (!queryParsed) return null

  const params = queryParsed[query]
  if (params === null || params === undefined) return null

  return params as GetQueryParamsReturnType<Options>
}
