import { Zerr } from '@/middleware'
import type { ITokensSchema } from '@/utilities'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Define the payload
const payloadSchema = z.object({
    id: z.string(),
    role: z.string(),
    'allowed-roles': z.array(z.string()),
})
type IPayload = z.infer<typeof payloadSchema>

export const generateTokens = (payload: IPayload): ITokensSchema => {
    // Validate the payload
    payloadSchema.safeParse(payload)

    const jwtAccessSecret = process.env.JWT_ACCESS_SECRET
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

    if (!jwtAccessSecret || !jwtRefreshSecret) {
        throw Zerr({ message: 'Token protection missed uniq keys', path: ['generateTokens'], status: 422 })
    }

    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '30d' })

    return { accessToken, refreshToken }
}
