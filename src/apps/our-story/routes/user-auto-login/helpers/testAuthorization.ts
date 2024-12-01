import type { Response, Request } from 'express'
import jwt from 'jsonwebtoken'

export const testAuthorization = (req: Request, res: Response) => {
    const { sessionJWT: requestSessionJWT, registrationId, bookingId } = req.body
    const refreshSecret = process.env.JWT_REFRESH_SECRET

    if (!registrationId && !bookingId && requestSessionJWT && refreshSecret) {
        try {
            jwt.verify(requestSessionJWT, refreshSecret)
        } catch (e) {
            return res.status(200).send({ message: 'unauthorized' })
        }
    }

    if (!refreshSecret && !requestSessionJWT && !bookingId) {
        return res.status(200).send({ message: 'unauthorized' })
    }
}
