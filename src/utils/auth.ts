import type { NextFunction, Request, Response } from 'express'
import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

export const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-8kfuj05wdpybj2ua.eu.auth0.com/.well-known/jwks.json',
    }) as GetVerificationKey,
    audience: 'https://nodejs-heroku-origin.com',
    issuer: 'https://dev-8kfuj05wdpybj2ua.eu.auth0.com/',
    algorithms: ['RS256'],
})

export const auth = (req: Request, res: Response, next: NextFunction) => {
    // x-api-key
    // if not x-api-key header
    // if not right key

    if (!req.header('x-api-key') || req.header('x-api-key') !== '022-56-90-13') {
        // not authorized status
        res.status(401)
        return res.json({ message: 'x-api-key is invalid' })
    }

    next()
}
