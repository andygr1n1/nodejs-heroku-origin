import { query_userDataByEmail } from '@/apps/kzen/services/graphql-service/query_userDataByEmail'
import { z } from 'zod'

import { insertNewUser } from './insertNewUser'

// Define a Zod schema for email validation
const emailSchema = z.string().email()

export const fetchUserIdByEmail = async (email: string): Promise<string | undefined> => {
    try {
        // Validate the email using Zod
        const emailValidation = emailSchema.safeParse(email)

        if (!emailValidation.success) {
            throw new Error('Invalid email format')
        }

        const user = await query_userDataByEmail(email)

        if (!user?.id) {
            return await insertNewUser(email)
        }

        return user.id
    } catch (e) {
        console.error('fetchUserIdByEmail error:', e)
        return
    }
}
