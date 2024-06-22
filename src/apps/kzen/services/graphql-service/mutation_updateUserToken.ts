import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { ISessionResSchema } from '../token-service/resolve-refresh-token/types'

export const mutation_updateUserToken = async (props: {
    sessionId: string
    refreshJwt: string
}): Promise<ISessionResSchema | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['mutation_updateUserToken'] })

        const mutation = gql`
            mutation mutation_ActivateUser($sessionId: uuid, $refreshJwt: String) {
                update_heroes_tokens(where: { session_id: { _eq: $sessionId } }, _set: { token: $refreshJwt }) {
                    returning {
                        session_id
                    }
                }
            }
        `

        const response: { update_heroes_tokens: { returning: ISessionResSchema[] } } = await client.request(mutation, {
            sessionId: props.sessionId,
            refreshJwt: props.refreshJwt,
        })
        return response?.update_heroes_tokens?.returning?.[0]
    } catch (e) {
        throw Zerr({ message: `Server is unavailable: ${e}`, status: 422, path: ['mutation_UpdateRefreshToken'] })
    }
}
