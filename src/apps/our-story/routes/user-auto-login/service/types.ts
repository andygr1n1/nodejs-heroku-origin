import { UserRoleSchema } from '@/apps/kzen/services/types'
import { z } from 'zod'

const identitySchema = z.object({
    id: z.string().uuid(),
    booking_number: z.string(),
    registration: z.boolean(),
})

export const weddingGroupsSchema = z.object({
    wedding_groups: z.array(identitySchema),
})

export type IValidateIdentityResponseSchema = z.infer<typeof weddingGroupsSchema>
export type IIdentitySchema = z.infer<typeof identitySchema>

export const parseJwtSchema = z.object({
    id: z.string(),
    booking_number: z.string(),
    role: UserRoleSchema,
    registration: z.boolean(),
    exp: z.number(),
})

export type IParseJwtSchema = z.infer<typeof parseJwtSchema>
