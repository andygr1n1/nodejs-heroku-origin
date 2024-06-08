import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { INewUser } from '../../register/types'

export const queryUserDataByEmail = async (email: string): Promise<INewUser | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const query = gql`
            query queryUserDataByEmail($email: String) {
                heroes(where: { email: { _eq: $email } }) {
                    id
                    email
                    created_at
                    password
                    name
                }
            }
        `

        const response: { heroes: INewUser[] } = await client.request(query, { email })
        return response?.heroes?.[0]
    } catch (e) {
        console.error('queryUserDataByEmail error:', e)
        return
    }
}
