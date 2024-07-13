import { z } from 'zod'

export const googleLoginRequestSchema = z.object({
    accessJWT: z.string(),
})

export type IGoogleLoginRequest = z.infer<typeof googleLoginRequestSchema>
