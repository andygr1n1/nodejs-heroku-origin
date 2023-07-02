import { gql } from 'graphql-request'
import { generateClient } from '../../../../api/client.js'

export const updateUserAvatar = async (userId: string, avatar: string): Promise<string | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation updateUserAvatar($userId: uuid!, $avatar: String) {
                update_heroes_by_pk(pk_columns: { id: $userId }, _set: { avatar: $avatar }) {
                    avatar
                }
            }
        `

        const response: { update_heroes_by_pk: { avatar: string } } = await client.request(mutation, {
            userId,
            avatar,
        })
        return response?.update_heroes_by_pk.avatar
    } catch (e) {
        console.info('updateUserAvatar error:', e)
        return
    }
}
