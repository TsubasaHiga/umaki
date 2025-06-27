import md5 from 'md5'

/**
 * Gravatarからアバター画像のUrlを取得する
 * @param email
 * @param size
 * @returns
 */
export const getGravatarUrl = (email: string, size: number): string => {
  const normalizedEmail = email.trim().toLowerCase()
  const gravatarUrl = `https://www.gravatar.com/avatar/${md5(normalizedEmail)}?s=${size}&d=404`
  return gravatarUrl
}