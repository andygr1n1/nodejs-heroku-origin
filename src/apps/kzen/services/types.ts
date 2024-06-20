import { z } from 'zod'

/*  */

export const ServerStatusSchema = z.enum(['success', 'registered', 'failed', 'unauthorized'])
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

export const kzenUserHeroRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(2),
    name: z.string(),
    role: z.string().min(1),
})
export type IKzenUserHeroRegisterSchema = z.infer<typeof kzenUserHeroRegisterSchema>

export const kzenUserSchema = z.object({
    id: z.string().uuid(),
    email: z.string(),
    name: z.string(),
    role: z.string(),
    password: z.string(),
    tokens: z.array(
        z
            .object({
                token: z.string(),
                session_id: z.string(),
            })
            .optional(),
    ),
})
export type IKzenUser = z.infer<typeof kzenUserSchema>

/*  */

const accessKeysSchema = z.object({
    accessId: z.string().min(1),
})

export type IAccessKeys = z.infer<typeof accessKeysSchema>

/*  */
export const emailSchema = z.object({
    email: z.string().email().min(1),
})

export type IEmail = z.infer<typeof emailSchema>

/*  */

export const activationCodeSchema = z.object({
    activationCode: z.string().min(1),
})
