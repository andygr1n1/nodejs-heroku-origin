import { kzenUserSchema } from '@/apps/kzen/services/types'
import { z } from 'zod'

const heroesTokensSchema = z.object({
    token: z.string(),
    session_id: z.string().uuid(),
    hero: kzenUserSchema,
})

export const fetchUserBySessionIdResponseSchema = z.object({
    data: z.object({
        heroes_tokens: z.array(heroesTokensSchema),
    }),
})

export type IFetchUserBySessionIdResponseSchema = z.infer<typeof fetchUserBySessionIdResponseSchema>

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type ILoginSchema = z.infer<typeof loginSchema>
