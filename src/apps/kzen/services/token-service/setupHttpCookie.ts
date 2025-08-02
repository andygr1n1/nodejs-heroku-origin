import jwt from 'jsonwebtoken'

import { Zerr } from '@/middleware'

export const setupSessionToken = ({ sessionId }: { sessionId: string }) => {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

    if (!jwtRefreshSecret) {
        throw Zerr({ message: 'Token protection missed uniq keys', path: ['generateTokens'], status: 422 })
    }

    const sessionJWT = jwt.sign({ sessionId }, jwtRefreshSecret, { expiresIn: '30d' })
    return sessionJWT
}
