import { Zerr } from '@/middleware'
import jwt from 'jsonwebtoken'

export const validateRefreshToken = (refreshJwt: string) => {
    const refreshSecret = process.env.JWT_REFRESH_SECRET
    if (!refreshJwt || !refreshSecret) {
        throw Zerr({
            path: ['validateRefreshToken', '!refreshJwt || !refreshSecret'],
            message: 'Failed to validate refresh token',
            status: 422,
        })
    }
    try {
        return jwt.verify(refreshJwt, refreshSecret)
    } catch (e) {
        throw Zerr({
            path: ['validateRefreshToken', 'jwt.verify'],
            message: 'Failed to validate refresh token',
            status: 422,
        })
    }
}
