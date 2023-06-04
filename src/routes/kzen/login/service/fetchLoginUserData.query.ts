import { gql } from 'graphql-request'
import { generateClient } from '../../../../api/client.js'

interface ILoginRes {
    id: string
}

export const fetchLoginUserData = async (email: string, password: string): Promise<string | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const query = gql`
            query HeroLogin($email: String, $password: String) {
                heroes(where: { email: { _eq: $email }, password: { _eq: $password } }) {
                    id
                }
            }
        `

        const response: { heroes: ILoginRes[] } = await client.request(query, { email, password })
        return response?.heroes[0]?.id
    } catch (e) {
        console.error('fetchLoginUserData error:', e)
        return
    }
}
