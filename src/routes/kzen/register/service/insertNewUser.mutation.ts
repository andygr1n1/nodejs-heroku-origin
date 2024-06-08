import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

import type { IKzenRegisterRequestData, INewUser } from '../types'
import { kzenRegisterSchema } from '../types'

export const insertNewUser = async (newUser: IKzenRegisterRequestData): Promise<INewUser | undefined> => {
    try {
        kzenRegisterSchema.parse(newUser)
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation insertNewUserMutation($name: String, $email: String, $password: String) {
                insert_heroes_one(
                    object: { email: $email, password: $password, name: $name, phone: "", birthday: null }
                ) {
                    id
                    email
                    created_at
                    password
                    name
                }
            }
        `

        const response: { insert_heroes_one: INewUser } = await client.request(mutation, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        return response?.insert_heroes_one
    } catch (e) {
        console.info('insertNewUser error:', e)
        return
    }
}
