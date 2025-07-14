import jwt from 'jsonwebtoken'
import { z } from 'zod'

import { UserRoleSchema } from '@/apps/kzen/services/types'
import { Zerr } from '@/middleware'

import type { ITokensSchema } from '@/services/types'

// Define the payload
const payloadSchema = z.object({
    id: z.string(),
    booking_number: z.string(),
    registration: z.boolean(),
    role: UserRoleSchema,
    'allowed-roles': z.array(UserRoleSchema),
})
type IPayload = z.infer<typeof payloadSchema>

export const guestTokenizer = (payload: IPayload): ITokensSchema => {
    // Validate the payload
    payloadSchema.safeParse(payload)

    const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

    if (!jwtAccessSecret || !jwtRefreshSecret) {
        throw Zerr({ message: 'Token protection missed uniq keys', path: ['generateTokens'], status: 422 })
    }

    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '360d' })
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '360d' })

    return { accessToken, refreshToken }
}
