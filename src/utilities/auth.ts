import * as dotenv from 'dotenv'
import type { NextFunction, Request, Response } from 'express'
import { expressjwt, type GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

// import { getJwtTokenSign } from './jwt-token-sign.js'
/* configs */
dotenv.config()

export const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_JWKS_URI ?? '',
    }) as GetVerificationKey,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
})

const getSecretKey = (): string => {
    const key = process.env.JWT_SECRET_KEY || 'S_E_C_R_E_T_S'
    return key
}

export const checkJwtBySecretKey = expressjwt(
    (() => {
        return {
            secret: getSecretKey(),
            algorithms: ['HS256'],
        }
    })(),
)

export const auth = (req: Request, res: Response, next: NextFunction) => {
    // x-api-key
    // if not x-api-key header
    // if not right key

    if (!req.header('x-api-key') || req.header('x-api-key') !== process.env.X_API_KEY) {
        // not authorized status
        res.status(401)
        return res.json({ message: 'X_API_KEY is invalid' })
    }
    // res.status(200).send(
    //     getJwtTokenSign({ email: 'andy.grini@gmail.com', name: 'andrei', password: '1231', id: 'xxx' }),
    // )
    next()
}
