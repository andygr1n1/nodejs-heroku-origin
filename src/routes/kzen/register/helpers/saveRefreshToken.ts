import { generateTokens } from '@/services/token-service/tokenService'
import { buildTimeStamp } from '@/utilities'
import { CustomError } from '@/utilities/errorHandling'

import { insertRefreshToken } from '../service/insertRefreshToken.mutation'
import type { INewUser } from '../types'
export const saveRefreshToken = async (registeredUser: INewUser) => {
    const tokens = generateTokens({ ...registeredUser })

    const result = await insertRefreshToken(registeredUser.id, tokens.refreshToken)

    if (!result) {
        console.info('Saving token failed', registeredUser, buildTimeStamp())
        throw new CustomError('Saving token failed', 'failed', 401)
    }

    return tokens
}
