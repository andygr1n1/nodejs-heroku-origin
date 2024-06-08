import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

export const insertRefreshToken = async (
    hero_id: string,
    token: string,
): Promise<{ hero_id: string; token: string } | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation insertRefreshTokenMutation($hero_id: uuid, $token: String) {
                insert_heroes_tokens_one(object: { hero_id: $hero_id, token: $token }) {
                    hero_id
                    token
                }
            }
        `

        const response: { insert_heroes_tokens_one: { hero_id: string; token: string } } = await client.request(
            mutation,
            {
                hero_id,
                token,
            },
        )
        return response?.insert_heroes_tokens_one
    } catch (e) {
        console.info('insert_heroes_tokens_one error:', e)
        return
    }
}
