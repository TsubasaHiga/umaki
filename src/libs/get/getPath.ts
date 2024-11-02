/**
 * Retrieves the specified path with `import.meta.env.BASE_URL` prepended to it.
 *
 * @param pathName - The path to be appended to the base URL.
 * @returns The full path including the base URL.
 */
export const getPath = (pathName: string): string =>
  import.meta.env.BASE_URL + pathName
