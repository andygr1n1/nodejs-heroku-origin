import { Zerr } from '@/middleware'
import { generateTokens } from '@/services/token-service'

import type { IKzenUser } from '../../utilities/types'
import { mutation_insertUserToken } from '../graphql-service'

export const saveRefreshToken = async (registeredUser: IKzenUser) => {
    const tokens = generateTokens({
        id: registeredUser.id,
        role: registeredUser.role,
        'allowed-roles': ['hero', 'superHero', 'guest'],
    })

    const result = await mutation_insertUserToken(registeredUser.id, tokens.refreshToken)

    if (!result?.session_id) {
        throw Zerr({ message: 'Failed to register user', path: ['saveRefreshToken'], status: 422 })
    }

    return { refreshId: tokens.refreshToken, accessId: tokens.accessToken, sessionId: result.session_id }
}
