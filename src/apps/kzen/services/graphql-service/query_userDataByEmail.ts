import type { IKzenUserRegisterSchema } from '@/apps/kzen/utilities/types'
import { Zerr } from '@/middleware'
import { generateClient } from '@/utilities'
import { gql } from 'graphql-request'

export const query_userDataByEmail = async (email: string): Promise<IKzenUserRegisterSchema | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['generateClient'] })

        const query = gql`
            query query_userDataByEmail($email: String) {
                heroes(where: { email: { _eq: $email } }) {
                    id
                    email
                    name
                }
            }
        `

        const response: { heroes: IKzenUserRegisterSchema[] } = await client.request(query, { email })
        return response?.heroes?.[0]
    } catch (e) {
        throw Zerr({ message: `Server is unavailable: ${e}`, status: 422, path: ['query_userDataByEmail'] })
    }
}
