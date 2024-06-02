import { z } from 'zod'

export const payloadSchema = z.record(z.string())
export type IPayload = z.infer<typeof payloadSchema>

export const emailSchema = z.object({
    email: z.string().email().min(1),
})

export type IEmail = z.infer<typeof emailSchema>

export const activationCodeSchema = z.object({
    activationCode: z.string().min(1),
})
