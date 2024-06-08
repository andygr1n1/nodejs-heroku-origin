import { Zerr } from '@/middleware'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

import type { ITokens } from './types'

// Define the payload
const payloadSchema = z.record(z.string())
type IPayload = z.infer<typeof payloadSchema>

export const generateTokens = (payload: IPayload): ITokens => {
    // Validate the payload
    payloadSchema.safeParse(payload)

    const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

    if (!jwtAccessSecret || !jwtRefreshSecret) {
        throw Zerr({ message: 'token protection missed uniq keys', path: ['generateTokens'], status: 401 })
    }

    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '30d' })

    return { accessToken, refreshToken }
}
