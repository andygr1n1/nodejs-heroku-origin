import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { IKzenUser, IKzenUserHeroRegisterSchema } from '../types'
import { kzenUserHeroRegisterSchema } from '../types'

export const mutation_InsertHeroUser = async (newUser: IKzenUserHeroRegisterSchema): Promise<IKzenUser | undefined> => {
    try {
        kzenUserHeroRegisterSchema.parse(newUser)

        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const mutation = gql`
            mutation mutation_InsertUser($name: String, $email: String, $password: String, $role: heroes_roles_enum) {
                insert_heroes_one(object: { email: $email, password: $password, name: $name, role: $role }) {
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

        const response: { insert_heroes_one: IKzenUser } = await client.request(mutation, { ...newUser })

        return response?.insert_heroes_one
    } catch (e) {
        throw Zerr({ message: `User registration failed: ${e}`, status: 422, path: ['mutation_InsertUser'] })
    }
}
