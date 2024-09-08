import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { IFetchUserBySessionIdResponseSchema } from './types'
import { fetchUserBySessionIdResponseSchema } from './types'

export const fetchUserBySessionId = async (
    sessionId: string,
): Promise<IFetchUserBySessionIdResponseSchema | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['fetchUserBySessionId'] })

        const query = gql`
            query fetchUserBySessionId($sessionId: uuid) {
                heroes_tokens(where: { session_id: { _eq: $sessionId } }) {
                    token
                    session_id
                    hero {
                        password
                        email
                        name
                        id
                        role
                        tokens {
                            token
                            session_id
                        }
                    }
                }
            }
        `

        const response = await client.request<IFetchUserBySessionIdResponseSchema>(query, { sessionId })
        const result = fetchUserBySessionIdResponseSchema.parse(response)
        if (result?.heroes_tokens && result.heroes_tokens.length === 0) {
            return
        }

        return result
    } catch (e) {
        throw Zerr({ message: `Server error: ${e}`, status: 422, path: ['fetchUserBySessionId'] })
    }
}
