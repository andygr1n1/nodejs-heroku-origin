import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { IUserAndToken } from '../../register/types'

export const query_UserByActivationCode = async (activationCode: string): Promise<IUserAndToken | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 503, path: ['query_UserByActivationCode'] })

        const query = gql`
            query query_UserByActivationCode($activationCode: String) {
                heroes(where: { password: { _eq: $activationCode } }) {
                    id
                    email
                    created_at
                    password
                    name
                    tokens {
                        token
                        session_id
                    }
                }
            }
        `

        const response: { heroes: IUserAndToken[] } = await client.request(query, { activationCode })
        return response?.heroes?.[0]
    } catch (e) {
        throw Zerr({ message: `query_UserByActivationCode: ${e}`, status: 422, path: ['query_UserByActivationCode'] })
    }
}
