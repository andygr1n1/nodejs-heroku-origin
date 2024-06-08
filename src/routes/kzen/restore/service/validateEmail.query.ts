import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

interface IValidateEmailRes {
    email: string
}

export const validateEmail = async (email: string): Promise<string | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const query = gql`
            query ValidateEmail($email: String) {
                heroes(where: { email: { _eq: $email } }) {
                    email
                }
            }
        `

        const response: { heroes: IValidateEmailRes[] } = await client.request(query, { email })
        return response?.heroes[0]?.email
    } catch (e) {
        console.info('validateEmail error:', e)
        return
    }
}
