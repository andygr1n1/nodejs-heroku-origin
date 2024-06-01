import { z } from 'zod'

export const RegisterStatus = {
    success: 'success',
    registered: 'registered',
    failed: 'failed',
} as const

export type IRegisterStatus = (typeof RegisterStatus)[keyof typeof RegisterStatus]

export const kzenRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
    name: z.string(),
    // Add any other fields in the IKzenRegisterRequestData interface
    // Example:
    // name: z.string(),
})

// Infer the type from the schema
export type IKzenRegisterRequestData = z.infer<typeof kzenRegisterSchema>

export type INewUser = { id: string; email: string; created_at: string; password: string; name: string }
