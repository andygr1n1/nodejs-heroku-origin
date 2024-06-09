import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

export const mutation_insertUserToken = async (
    hero_id: string,
    token: string,
): Promise<{ hero_id: string; token: string; session_id: string } | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const mutation = gql`
            mutation mutation_insertUserToken($hero_id: uuid, $token: String) {
                insert_heroes_tokens_one(object: { hero_id: $hero_id, token: $token }) {
                    hero_id
                    token
                    session_id
                }
            }
        `

        const response: { insert_heroes_tokens_one: { hero_id: string; token: string; session_id: string } } =
            await client.request(mutation, {
                hero_id,
                token,
            })
        return response?.insert_heroes_tokens_one
    } catch (e) {
        throw Zerr({ message: 'Failed to register user', status: 422, path: ['mutation_insertUserToken'] })
    }
}
