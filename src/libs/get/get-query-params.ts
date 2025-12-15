import queryString, { type ParseOptions } from 'query-string'

// Default parsing options for query-string.
const queryStringOptions: ParseOptions = {
  arrayFormat: 'comma',
  parseNumbers: true
}

export type GetQueryParamsReturnType =
  | string
  | number
  | (string | number | null)[]
  | null

export type GetQueryParamsOptions = {
  searchString?: string
  parseOptions?: ParseOptions
}

/**
 * Retrieves the value of a specified query parameter from the URL.
 *
 * @param query - The name of the query parameter to retrieve.
 * @param options - Optional. An object containing searchString and parseOptions.
 * @returns The value of the query parameter, which can be a string, number, array of strings or numbers, or null if the parameter is not found.
 */
export const getQueryParams = (
  query: string,
  options: GetQueryParamsOptions = {}
): GetQueryParamsReturnType => {
  const { searchString = window.location.search, parseOptions } = options
  const queryOptions = {
    ...queryStringOptions,
    ...parseOptions
  }
  const queryParsed = queryString.parse(searchString, queryOptions)
  if (!queryParsed) return null

  const params = queryParsed[query]
  if (params === null || params === undefined) return null

  return params
}
