import { type IKzenUser } from '@/apps/kzen/services/types'
import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const query_userDataByEmail = async (email: string): Promise<IKzenUser | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['query_userDataByEmail'] })

        const query = gql`
            query query_userDataByEmail($email: String) {
                heroes(where: { email: { _eq: $email } }) {
                    password
                    email
                    name
                    id
                    role
                    tokens {
                        token
                        session_id
                    }
                }
            }
        `

        const response = await client.request<{ heroes: IKzenUser[] }>(query, { email })
        const result = response?.heroes?.[0]

        return result
    } catch (e) {
        throw Zerr({ message: `Server error${e}`, status: 422, path: ['query_userDataByEmail'] })
    }
}
