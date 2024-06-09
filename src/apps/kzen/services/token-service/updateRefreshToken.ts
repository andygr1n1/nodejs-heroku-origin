import type { IKzenUser } from '@/apps/kzen/utilities/types'
import { Zerr } from '@/middleware'
import { generateTokens } from '@/services/token-service'

import { mutation_updateUserToken } from './../graphql-service/mutation_updateUserToken'

// on register we have only 1 token, and can update it by userId
export const updateRefreshToken = async (registeredUser: IKzenUser) => {
    const tokens = generateTokens({ id: registeredUser.id })

    const result = await mutation_updateUserToken(registeredUser.id, tokens.refreshToken)

    if (!result) {
        throw Zerr({ message: 'Saving token failed', path: ['updateRefreshToken'], status: 401 })
    }

    return { tokens, sessionId: result.session_id }
}

//  const tokens = generateTokens({ id: registeredUser.id })
//  const result = await insertRefreshToken(registeredUser.id, tokens.refreshToken)

//  if (!result?.session_id) {
//      throw Zerr({ message: 'Saving token failed', path: ['saveRefreshToken'], status: 422 })
//  }

//  return { tokens, sessionId: result.session_id }
