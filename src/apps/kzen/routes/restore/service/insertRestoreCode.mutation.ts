import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

export const insertRestoreCode = async (email: string): Promise<string | undefined> => {
    const client = generateClient()

    if (!client) throw new Error('generate client error')

    const mutation = gql`
        mutation insertRestoreCode($email: String) {
            insert_restore_codes_one(object: { email: $email }) {
                id
            }
        }
    `

    try {
        const response: { insert_restore_codes_one: { id: string } } = await client.request(mutation, {
            email,
        })

        return response.insert_restore_codes_one.id
    } catch (e) {
        console.error('insertGoalMutation error', e)
        return
    }
}
