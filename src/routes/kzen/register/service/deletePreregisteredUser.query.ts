import { generateClient } from '@/api/client'
import { gql } from 'graphql-request'

import type { INewUser } from '../types'

export const deletePreregisteredUser = async (email: string) => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation deletePreregisteredUser($email: String) {
                delete_heroes(where: { email: { _eq: $email } }) {
                    affected_rows
                }
                delete_restore_codes(where: { email: { _eq: $email } }) {
                    affected_rows
                }
            }
        `

        const response: { insert_heroes_one: INewUser } = await client.request(mutation, {
            email,
        })
        return response
    } catch (e) {
        console.info('deletePreregisteredUser error:', e)
        return
    }
}
