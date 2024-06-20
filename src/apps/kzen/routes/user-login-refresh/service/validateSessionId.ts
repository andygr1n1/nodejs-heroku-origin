import type { IKzenUser } from '@/apps/kzen/services/types'
import jwt from 'jsonwebtoken'

import { fetchUserBySessionId } from './fetchUserBySessionId'

export const validateSessionId = async (sessionId: string): Promise<IKzenUser | undefined> => {
    const userResponse = await fetchUserBySessionId(sessionId)
    const refreshJwt = userResponse?.heroes_tokens?.[0].token

    const refreshSecret = process.env.JWT_REFRESH_SECRET

    try {
        if (!refreshJwt || !refreshSecret) return
        jwt.verify(refreshJwt, refreshSecret)
    } catch (e) {
        return
    }

    return userResponse?.heroes_tokens?.[0].hero
}
