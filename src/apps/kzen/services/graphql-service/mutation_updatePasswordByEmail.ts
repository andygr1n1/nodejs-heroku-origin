import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import { kzenUserSchema, type IKzenUser } from '../types'

export const mutation_updatePasswordByEmail = async (props: {
    email: string
    password: string
}): Promise<IKzenUser | undefined> => {
    try {
        const client = generateClient()
        if (!client)
            throw Zerr({ message: 'Generate client error', status: 422, path: ['mutation_updatePasswordByEmail'] })

        const mutation = gql`
            mutation mutation_updatePasswordByEmail($email: String, $password: String) {
                update_heroes(where: { email: { _eq: $email } }, _set: { password: $password }) {
                    returning {
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
                delete_restore_codes(where: { email: { _eq: $email } }) {
                    affected_rows
                }
            }
        `

        const response: { update_heroes: { returning: IKzenUser[] } } = await client.request(mutation, {
            email: props.email,
            password: props.password,
        })

        const result = kzenUserSchema.parse(response?.update_heroes?.returning?.[0])
        return result
    } catch (e) {
        throw Zerr({ message: `Server is unavailable: ${e}`, status: 422, path: ['mutation_updatePasswordByEmail'] })
    }
}
