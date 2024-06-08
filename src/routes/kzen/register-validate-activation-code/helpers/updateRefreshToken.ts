import { Zerr } from '@/middleware'
import { generateTokens } from '@/services/token-service/tokenService'

import type { INewUser } from '../../register/types'
import { mutation_UpdateRefreshToken } from '../service/mutation_UpdateRefreshToken'

// on register we have only 1 token, and can update it by userId
export const updateRefreshToken = async (registeredUser: INewUser) => {
    const tokens = generateTokens({ id: registeredUser.id })

    const result = await mutation_UpdateRefreshToken(registeredUser.id, tokens.refreshToken)

    if (!result) {
        throw Zerr({ message: 'Saving token failed', path: ['updateRefreshToken'], status: 401 })
    }

    return tokens
}
