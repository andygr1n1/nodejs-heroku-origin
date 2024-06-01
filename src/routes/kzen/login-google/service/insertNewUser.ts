import { gql } from 'graphql-request'
import { z } from 'zod'

import { generateClient } from '../../../../api/client'
import { generateNewPassword } from '../helpers/generateNewPassword'

// Define the schema for the mutation response
const InsertHeroesOneSchema = z.object({
    id: z.string(),
})

// Define the schema for the overall response
const MutationResponseSchema = z.object({
    insert_heroes_one: InsertHeroesOneSchema,
})

export const insertNewUser = async (email: string): Promise<string | undefined> => {
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

        const response = await client.request(mutation, {
            name: email,
            email: email,
            password: generateNewPassword(),
        })

        // Validate the response using Zod
        const parsedResponse = MutationResponseSchema.parse(response)

        return parsedResponse.insert_heroes_one?.id
    } catch (e) {
        console.log('google sign in getUserId:::', e)
    }
}
