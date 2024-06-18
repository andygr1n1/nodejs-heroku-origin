import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { ISessionResSchema } from '../token-service/resolve-refresh-token/types'

export const mutation_updateUserToken = async (
    heroId: string,
    refreshJwt: string,
): Promise<ISessionResSchema | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['mutation_updateUserToken'] })

        const mutation = gql`
            mutation mutation_ActivateUser($heroId: uuid, $refreshJwt: String) {
                update_heroes_tokens(where: { hero_id: { _eq: $heroId } }, _set: { token: $refreshJwt }) {
                    returning {
                        session_id
                    }
                }
            }
        `

        const response: { update_heroes_tokens: { returning: ISessionResSchema[] } } = await client.request(mutation, {
            heroId,
            refreshJwt,
        })
        return response?.update_heroes_tokens?.returning?.[0]
    } catch (e) {
        throw Zerr({ message: `Server is unavailable: ${e}`, status: 422, path: ['mutation_UpdateRefreshToken'] })
    }
}
