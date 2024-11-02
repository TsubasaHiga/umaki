import path from 'node:path'

/**
 * Get the full path of a file located in the local public folder.
 *
 * @param fileName - The name of the file for which to get the path.
 * @returns The full path to the specified file in the local public folder.
 */
export const getPathFromLocalPublic = (fileName: string): string =>
  path.join(process.cwd(), 'public', fileName)
