import { generateClient } from '@/api/client'
import { gql } from 'graphql-request'

export const insertRefreshToken = async (
    id: string,
    token: string,
): Promise<{ id: string; token: string } | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation insertRefreshTokenMutation($id: uuid, $token: String) {
                insert_heroes_tokens_one(object: { id: $id, token: $token }) {
                    id
                    token
                }
            }
        `

        const response: { insert_heroes_tokens_one: { id: string; token: string } } = await client.request(mutation, {
            id,
            token,
        })
        return response?.insert_heroes_tokens_one
    } catch (e) {
        console.info('insert_heroes_tokens_one error:', e)
        return
    }
}
