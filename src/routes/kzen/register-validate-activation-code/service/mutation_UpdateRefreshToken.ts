import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { IUpdatedHeroTokenSchema } from '../types'

export const mutation_UpdateRefreshToken = async (
    heroId: string,
    refreshJwt: string,
): Promise<IUpdatedHeroTokenSchema | undefined> => {
    try {
        const client = generateClient()
        if (!client)
            throw Zerr({ message: 'Generate client error', status: 503, path: ['mutation_UpdateRefreshToken'] })

        const mutation = gql`
            mutation mutation_ActivateUser($heroId: uuid, $refreshJwt: String) {
                update_heroes_tokens(where: { hero_id: { _eq: $heroId } }, _set: { token: $refreshJwt }) {
                    returning {
                        hero_id
                        token
                        session_id
                    }
                }
            }
        `

        const response: { update_heroes_tokens: { returning: IUpdatedHeroTokenSchema[] } } = await client.request(
            mutation,
            {
                heroId,
                refreshJwt,
            },
        )
        return response?.update_heroes_tokens?.returning?.[0]
    } catch (e) {
        throw Zerr({ message: `mutation_UpdateRefreshToken: ${e}`, status: 422, path: ['mutation_UpdateRefreshToken'] })
    }
}
