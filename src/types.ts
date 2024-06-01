import { z } from 'zod'

export const payloadSchema = z.record(z.string())
export type IPayload = z.infer<typeof payloadSchema>
