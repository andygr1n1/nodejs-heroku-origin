import { generateClient } from '@/api/client'
import { gql } from 'graphql-request'

export const getIsUserRegistered = async (email: string): Promise<boolean | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const query = gql`
            query usersWithEmail($email: String) {
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
        console.error('getIsUserRegistered error:', e)
        return
    }
}
