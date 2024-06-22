import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const insertRestoreCode = async (email: string): Promise<string | undefined> => {
    const client = generateClient()
    if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

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

        const codeId = response.insert_restore_codes_one.id

        if (!codeId)
            throw Zerr({
                message: 'Server error, please contact our support team',
                status: 422,
                path: ['insertRestoreCode', 'codeId'],
            })

        return codeId
    } catch (e) {
        throw Zerr({
            message: 'Server error, please contact our support team',
            status: 422,
            path: ['insertRestoreCode'],
        })
    }
}
