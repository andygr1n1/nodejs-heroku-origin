import { Zerr } from '@/middleware'
import { generateTokens } from '@/services/token-service'

import type { ISessionResSchema } from './types'
import { mutation_insertUserToken, mutation_updateUserToken } from '../../graphql-service'
import { ALLOWED_ROLES, type IKzenUser } from '../../types'

/*  add,update refresh jwt */
export const resolveRefreshToken = async (props: { user: IKzenUser; sessionId?: string }) => {
    const { user, sessionId } = props

    const tokens = generateTokens({
        id: user.id,
        role: user.role,
        'allowed-roles': ALLOWED_ROLES,
    })

    let sessionRes: ISessionResSchema | undefined

    if (sessionId) {
        // if sessionId i want to update refresh token in db because i know it exists and it is valid
        sessionRes = await mutation_updateUserToken({ sessionId, refreshJwt: tokens.refreshToken })
    } else {
        sessionRes = await mutation_insertUserToken(user.id, tokens.refreshToken)
    }
    if (!sessionRes?.session_id) {
        throw Zerr({ message: 'Failed to authorize user', path: ['saveRefreshToken'], status: 422 })
    }

    return { refreshId: tokens.refreshToken, accessJWT: tokens.accessToken, sessionId: sessionRes.session_id }
}
