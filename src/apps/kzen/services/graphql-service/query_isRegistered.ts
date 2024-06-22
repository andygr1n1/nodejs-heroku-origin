import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const query_isRegistered = async (email: string): Promise<boolean | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const query = gql`
            query query_isRegistered($email: String) {
                heroes_aggregate(where: { email: { _eq: $email } }) {
                    aggregate {
                        count
                    }
                }
            }
        `

        const response: { heroes_aggregate: { aggregate: { count: number } } } = await client.request(query, { email })
        return !!response?.heroes_aggregate?.aggregate?.count
    } catch (e) {
        throw Zerr({ message: 'User not found', status: 422, path: ['query_isRegistered'] })
    }
}
