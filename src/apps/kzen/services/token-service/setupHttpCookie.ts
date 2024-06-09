import type { Response } from 'express'

export const setupHttpCookie = (res: Response, sessionId: string) => {
    res.cookie('sessionId', sessionId, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true,
    })
}
