import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { IUserAndToken } from '../../register/types'

export const mutation_ActivateUser = async (password: string): Promise<IUserAndToken | undefined> => {
    try {
        const client = generateClient()
        if (!client)
            throw Zerr({ message: 'Generate client error', status: 503, path: ['mutation_UpdateRefreshToken'] })

        const mutation = gql`
            mutation mutation_ActivateUser($password: String) {
                update_heroes(where: { password: { _eq: $password } }, _set: { role: hero }) {
                    returning {
                        id
                        email
                        name
                        password
                        tokens {
                            token
                            session_id
                        }
                        role
                    }
                }
            }
        `

        const response: { update_heroes: { returning: IUserAndToken[] } } = await client.request(mutation, {
            password,
        })
        return response?.update_heroes?.returning?.[0]
    } catch (e) {
        throw Zerr({
            message: `mutation_ActivateUser: ${e}`,
            status: 422,
            path: ['mutation_ActivateUser'],
        })
    }
}
