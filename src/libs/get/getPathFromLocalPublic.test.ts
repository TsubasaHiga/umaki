import path from 'node:path'
import { getPathFromLocalPublic } from './getPathFromLocalPublic'

describe('getPathFromLocalPublic', () => {
  it('should return the correct path for a given file name', () => {
    const fileName = 'example.txt'
    const expectedPath = path.join(process.cwd(), 'public', fileName)
    const result = getPathFromLocalPublic(fileName)
    expect(result).toBe(expectedPath)
  })

  it('should handle empty file name', () => {
    const fileName = ''
    const expectedPath = path.join(process.cwd(), 'public', fileName)
    const result = getPathFromLocalPublic(fileName)
    expect(result).toBe(expectedPath)
  })

  it('should handle file name with subdirectories', () => {
    const fileName = 'sub-dir/example.txt'
    const expectedPath = path.join(process.cwd(), 'public', fileName)
    const result = getPathFromLocalPublic(fileName)
    expect(result).toBe(expectedPath)
  })
})
