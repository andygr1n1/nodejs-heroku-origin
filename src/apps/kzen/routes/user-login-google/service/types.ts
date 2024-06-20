import { z } from 'zod'

export const googleLoginRequestSchema = z.object({
    accessId: z.string(),
})

export type IGoogleLoginRequest = z.infer<typeof googleLoginRequestSchema>
