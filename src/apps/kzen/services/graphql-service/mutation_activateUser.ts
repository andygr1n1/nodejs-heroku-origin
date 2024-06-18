import type { IKzenUser } from '@/apps/kzen/services/types'
import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

export const mutation_activateUser = async (password: string): Promise<IKzenUser | undefined> => {
    try {
        const client = generateClient()
        if (!client)
            throw Zerr({ message: 'Generate client error', status: 422, path: ['mutation_UpdateRefreshToken'] })

        const mutation = gql`
            mutation mutation_activateUser($password: String) {
                update_heroes(where: { password: { _eq: $password } }, _set: { role: hero }) {
                    returning {
                        id
                        role
                        tokens {
                            token
                            session_id
                        }
                    }
                }
            }
        `

        const response: { update_heroes: { returning: IKzenUser[] } } = await client.request(mutation, {
            password,
        })
        return response?.update_heroes?.returning?.[0]
    } catch (e) {
        throw Zerr({
            message: `Server is unavailable: ${e}`,
            status: 422,
            path: ['mutation_ActivateUser'],
        })
    }
}
