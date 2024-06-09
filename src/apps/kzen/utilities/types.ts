import { z } from 'zod'

/*  */

export const ServerStatusSchema = z.enum(['success', 'registered', 'failed'])
export const ServerStatus = ServerStatusSchema.Values
export type IServerStatus = z.infer<typeof ServerStatusSchema>

/*  */

export const kzenUserRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
    name: z.string(),
})
export type IKzenUserRegisterSchema = z.infer<typeof kzenUserRegisterSchema>

/*  */

export const kzenUserSchema = z.object({
    id: z.string().uuid(),
    role: z.string(),
    tokens: z.array(
        z.object({
            token: z.string(),
            session_id: z.string(),
        }),
    ),
})
export type IKzenUser = z.infer<typeof kzenUserSchema>

/*  */

const accessKeysSchema = z.object({
    accessId: z.string().min(1),
})

export type IAccessKeys = z.infer<typeof accessKeysSchema>

/*  */

const updateUserTokenSchema = z.object({
    session_id: z.string().min(1),
})

export type IUpdateUserTokenSchema = z.infer<typeof updateUserTokenSchema>
