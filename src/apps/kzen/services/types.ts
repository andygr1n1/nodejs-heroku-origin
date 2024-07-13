import { z } from 'zod'

export const ServerStatusSchema = z.enum(['success', 'registered', 'failed', 'unauthorized'])
export const ServerStatus = ServerStatusSchema.Values

/*  */

export const UserRoleSchema = z.enum(['hero', 'guest', 'super_hero', 'admin'])
export const UserRole = UserRoleSchema.Values
export type IUserRole = z.infer<typeof UserRoleSchema>

export const ALLOWED_ROLES: IUserRole[] = [UserRole.admin, UserRole.guest, UserRole.hero, UserRole.super_hero]

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
    role: UserRoleSchema,
})
export type IKzenUserHeroRegisterSchema = z.infer<typeof kzenUserHeroRegisterSchema>

export const kzenUserSchema = z.object({
    id: z.string().uuid(),
    email: z.string(),
    name: z.string(),
    role: UserRoleSchema,
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

/*  */
export const emailSchema = z.object({
    email: z.string().email().min(1),
})

export type IEmail = z.infer<typeof emailSchema>

/*  */

export const activationCodeSchema = z.object({
    activationCode: z.string().min(1),
})
