import type { Response } from 'express'

export const setupHttpCookie = (res: Response, sessionId: string) => {
    res.cookie('sessionId', sessionId, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Ensure secure is only true in production
        // secure: process.env.NODE_ENV === 'production', // Ensure secure is only true in production
        secure: true, // Ensure secure is only true in production
        sameSite: 'none', // Allow cross-site usage
    })
}
