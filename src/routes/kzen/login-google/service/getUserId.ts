import { gql } from 'graphql-request'
import { z } from 'zod'

import { generateClient } from '../../../../utilities/graphqlClient'

// Define the schema for the response
const ILoginResSchema = z.object({
    id: z.string(),
})

// Define the schema for the query response
const QueryResponseSchema = z.object({
    heroes: z.array(ILoginResSchema),
})

export const getUserId = async (email: string): Promise<string | undefined> => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const query = gql`
            query HeroLogin($email: String, $password: String) {
                heroes(where: { email: { _eq: $email } }) {
                    id
                }
            }
        `

        const response = await client.request(query, { email })

        // Validate the response using Zod
        const parsedResponse = QueryResponseSchema.parse(response)

        return parsedResponse.heroes[0]?.id
    } catch (e) {
        console.log('google sign in getUserId:::', e)
    }
}
