import { z } from 'zod'

export const updatePasswordSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
    newPassword: z.string().min(1),
    repeatNewPassword: z.string().min(1),
})

export type IUpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
