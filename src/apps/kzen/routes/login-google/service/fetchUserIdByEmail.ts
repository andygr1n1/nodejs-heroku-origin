import { z } from 'zod'

import { getUserId } from './getUserId'
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

        let userId = await getUserId(email)

        if (!userId) {
            userId = await insertNewUser(email)
        }

        return userId
    } catch (e) {
        console.error('fetchUserIdByEmail error:', e)
        return
    }
}
