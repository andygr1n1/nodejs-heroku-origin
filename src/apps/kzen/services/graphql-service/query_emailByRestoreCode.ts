import { emailSchema, type IEmail } from '@/apps/kzen/services/types'
import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const query_emailByRestoreCode = async (restoreCode: string): Promise<IEmail | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['query_emailByRestoreCode'] })

        const query = gql`
            query query_emailByRestoreCode($restoreCode: uuid!) {
                restore_codes_by_pk(id: $restoreCode) {
                    email
                }
            }
        `

        const response = await client.request<{ restore_codes_by_pk: IEmail }>(query, { restoreCode })
        const result = emailSchema.parse(response?.restore_codes_by_pk)
        return result
    } catch (e) {
        throw Zerr({ message: `Server error${e}`, status: 422, path: ['query_emailByRestoreCode'] })
    }
}
