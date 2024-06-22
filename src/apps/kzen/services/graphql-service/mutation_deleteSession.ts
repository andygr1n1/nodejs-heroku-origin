import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const mutation_deleteSession = async (sessionId: string) => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const mutation = gql`
            mutation mutation_deleteUser($sessionId: uuid!) {
                delete_heroes_tokens(where: { session_id: { _eq: $sessionId } }) {
                    affected_rows
                }
            }
        `

        await client.request(mutation, {
            sessionId,
        })
    } catch (e) {
        throw Zerr({ message: `Failed to delete session: ${e}`, status: 422, path: ['mutation_deleteSession'] })
    }
}
