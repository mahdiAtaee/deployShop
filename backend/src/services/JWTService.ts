import * as JWT from 'jsonwebtoken'

export const sign = (data: any) => {
    return JWT.sign(data, process.env.APP_SECRET as string)
}

export const verify = (token: string):any => {
    return JWT.verify(token, process.env.APP_SECRET as string)
}