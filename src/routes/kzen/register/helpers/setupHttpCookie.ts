import type { ITokens } from '@/services/token-service/types'
import type { Response } from 'express'

export const setupHttpCookie = (res: Response, tokens: ITokens) => {
    res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,
    })
}
