import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const deleteRestoreCode = async (code: string) => {
    const client = generateClient()

    if (!client) throw new Error('generate client error')

    const mutation = gql`
        mutation deleteRestoreCode($code: uuid!) {
            delete_restore_codes_by_pk(id: $code) {
                id
            }
        }
    `

    try {
        const response: { delete_restore_codes_by_pk: { id: string } } = await client?.request(mutation, { code })
        return response.delete_restore_codes_by_pk?.id
    } catch (e) {
        console.error('deleteRestoreCode error', e)
        return
    }
}
