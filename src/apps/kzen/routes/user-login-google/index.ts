import { Zerr, auth } from '@/middleware'
import type { Express } from 'express'
import { OAuth2Client } from 'google-auth-library'

import { generateGoogleUser } from './service/generateGoogleUser'
import { googleLoginRequestSchema } from './service/types'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { resolveRefreshToken, setupSessionToken } from '../../services/token-service'
import { ServerStatus, type IKzenUser } from '../../services/types'

export const kzenLoginGoogle = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN_GOOGLE, auth, async function (req, res) {
        const googleData = googleLoginRequestSchema.parse(req.body)
        const client = new OAuth2Client()

        const ticket = await client.getTokenInfo(googleData.accessJWT)

        const email = ticket.email

        if (!email) {
            throw Zerr({
                path: ['kzenLoginGoogle', 'email'],
                message: 'Google login failed',
                status: 401,
            })
        }

        const user: IKzenUser | undefined = await generateGoogleUser(email)

        if (!user) {
            throw Zerr({
                path: ['kzenLoginGoogle', 'user'],
                message: 'Google login failed',
                status: 401,
            })
        }

        /* *** */
        /* if user sent request on this route, he doesn't have a valid session. */
        /* must be created a session and a refresh token related to it */
        const { sessionId, accessJWT } = await resolveRefreshToken({ user })
        const sessionJWT = setupSessionToken({ sessionId })
        res.status(200).send({ message: ServerStatus.success, accessJWT, sessionJWT })
    })
}
