import { z } from 'zod'

const sessionResSchema = z.object({
    session_id: z.string().min(1),
})

export type ISessionResSchema = z.infer<typeof sessionResSchema>
