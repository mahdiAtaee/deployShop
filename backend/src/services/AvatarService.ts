import * as crypto from 'crypto'

export const buildAvatar = (email: string, size: number) => {
    const emailHashed = crypto.createHash('sha256').update(email).digest('hex')
    return `https://www.gravatar.com/avatar/${emailHashed}?s=${size}&d=identicon`
}