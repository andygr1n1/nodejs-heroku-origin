import { z } from 'zod'

export const newPasswordSchema = z.object({
    password: z.string().min(1),
    passwordRepeat: z.string().min(1),
    restoreCode: z.string().min(1),
})

export type INewPasswordSchema = z.infer<typeof newPasswordSchema>
