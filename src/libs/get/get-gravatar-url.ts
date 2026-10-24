import md5 from 'md5'

/**
 * Generates a Gravatar avatar image URL from an email address and size parameter.
 *
 * This function creates a Gravatar URL by normalizing the email (trimming whitespace
 * and converting to lowercase), generating an MD5 hash, and appending the size
 * parameter with a 404 fallback.
 *
 * MD5 is used only because Gravatar requires it; do not use it for security purposes.
 * Note that the hash in the URL can be used to look up or enumerate email addresses.
 *
 * @param email - The email address to generate the Gravatar URL for.
 * @param size - The size of the avatar image in pixels.
 * @returns The Gravatar avatar image URL.
 * @throws {Error} If size is not a positive integer.
 */
export const getGravatarUrl = (email: string, size: number): string => {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error('size must be a positive integer')
  }

  const normalizedEmail = email.trim().toLowerCase()
  const gravatarUrl = `https://www.gravatar.com/avatar/${md5(normalizedEmail)}?s=${size}&d=404`
  return gravatarUrl
}
