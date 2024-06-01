import { generateClient } from '@/api/client'
import { gql } from 'graphql-request'

interface ILoginRes {
    id: string
    email: string
    password: string
}

export const getPasswordByEmail = async (email: string): Promise<ILoginRes | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const query = gql`
            query HeroLogin($email: String) {
                heroes(where: { email: { _eq: $email } }) {
                    id
                    email
                    password
                }
            }
        `

        const response: { heroes: ILoginRes[] } = await client.request(query, { email })
        return response?.heroes[0]
    } catch (e) {
        console.error('getPasswordByEmail error:', e)
        return
    }
}
