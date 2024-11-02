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

/**
 * Retrieves the value of a specified query parameter from the URL.
 *
 * @param query - The name of the query parameter to retrieve.
 * @param parseOptions - Optional. Custom parsing options to override the default settings.
 * @returns The value of the query parameter, which can be a string, number, array of strings or numbers, or null if the parameter is not found.
 */
export const getQueryParams = (
  query: string,
  parseOptions?: ParseOptions
): GetQueryParamsReturnType => {
  const options = {
    ...queryStringOptions,
    ...parseOptions
  }
  const queryParsed = queryString.parse(window.location.search, options)
  if (!queryParsed) return null

  const params = queryParsed[query]
  if (params === null || params === undefined) return null

  // console.log({ queryParsed, params })

  return params
}
