import { z } from 'zod'

export const newPasswordSchema = z.object({
    password: z.string().email().min(1),
    passwordRepeat: z.string().email().min(1),
    restoreCode: z.string().email().min(1),
})

export type INewPasswordSchema = z.infer<typeof newPasswordSchema>
