import { Zerr } from '@/middleware'
import { generateTokens } from '@/services/token-service/tokenService'

import { insertRefreshToken } from '../service/insertRefreshToken.mutation'
import type { INewUser } from '../types'
export const saveRefreshToken = async (registeredUser: INewUser) => {
    const tokens = generateTokens({ ...registeredUser })
    const result = await insertRefreshToken(registeredUser.id, tokens.refreshToken)
    !result && Zerr({ message: 'Saving token failed', path: ['saveRefreshToken'], status: 401 })
    return tokens
}
