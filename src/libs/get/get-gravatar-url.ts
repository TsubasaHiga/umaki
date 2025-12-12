import md5 from 'md5'

/**
 * Generates a Gravatar avatar image URL from an email address and size parameter.
 *
 * This function creates a Gravatar URL by normalizing the email (trimming whitespace
 * and converting to lowercase), generating an MD5 hash, and appending the size
 * parameter with a 404 fallback.
 *
 * @param email - The email address to generate the Gravatar URL for.
 * @param size - The size of the avatar image in pixels.
 * @returns The Gravatar avatar image URL.
 */
export const getGravatarUrl = (email: string, size: number): string => {
  const normalizedEmail = email.trim().toLowerCase()
  const gravatarUrl = `https://www.gravatar.com/avatar/${md5(normalizedEmail)}?s=${size}&d=404`
  return gravatarUrl
}
