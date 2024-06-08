import { z } from 'zod'

const accessKeysSchema = z.object({
    heroId: z.string().min(1),
    sessionId: z.string().min(1),
    accessId: z.string().min(1),
})

export type IAccessKeys = z.infer<typeof accessKeysSchema>

const updatedHeroTokenSchema = z.object({
    hero_id: z.string().min(1),
    session_id: z.string().min(1),
    token: z.string().min(1),
})

export type IUpdatedHeroTokenSchema = z.infer<typeof updatedHeroTokenSchema>
