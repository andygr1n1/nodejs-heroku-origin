import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { IKzenUserRegisterSchema } from '../../utilities/types'
import { kzenUserRegisterSchema } from '../../utilities/types'

export const mutation_InsertUser = async (
    newUser: IKzenUserRegisterSchema,
): Promise<IKzenUserRegisterSchema | undefined> => {
    try {
        kzenUserRegisterSchema.parse(newUser)

        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const mutation = gql`
            mutation mutation_InsertUser($name: String, $email: String, $password: String) {
                insert_heroes_one(
                    object: { email: $email, password: $password, name: $name, phone: "", birthday: null }
                ) {
                    name
                    email
                    password
                }
            }
        `

        const response: { insert_heroes_one: IKzenUserRegisterSchema } = await client.request(mutation, { ...newUser })

        return response?.insert_heroes_one
    } catch (e) {
        throw Zerr({ message: 'User registration failed', status: 422, path: ['mutation_InsertUser'] })
    }
}
