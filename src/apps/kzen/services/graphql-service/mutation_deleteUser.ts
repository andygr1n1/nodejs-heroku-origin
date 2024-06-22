import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const mutation_deleteUser = async (email: string) => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const mutation = gql`
            mutation mutation_deleteUser($email: String) {
                delete_heroes(where: { email: { _eq: $email } }) {
                    affected_rows
                }
            }
        `

        await client.request(mutation, {
            email,
        })
    } catch (e) {
        throw Zerr({ message: 'Failed to delete user', status: 422, path: ['mutation_deleteUser'] })
    }
}
