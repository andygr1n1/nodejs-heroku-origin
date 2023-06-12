import { gql } from 'graphql-request'
import { generateClient } from '../../../../api/client.js'
import { IKzenRegisterReqBody } from '../kzenRegister.js'

export const insertNewUser = async (newUser: IKzenRegisterReqBody): Promise<string | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation insertNewUserMutation($name: String, $email: String, $password: String) {
                insert_heroes_one(object: { email: $email, password: $password, name: $name, phone: "" }) {
                    id
                }
            }
        `

        const response: { insert_heroes_one: { id: string } } = await client.request(mutation, {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        })
        console.info('response', response)
        return response?.insert_heroes_one.id
    } catch (e) {
        console.info('insertNewUser error:', e)
        return
    }
}
