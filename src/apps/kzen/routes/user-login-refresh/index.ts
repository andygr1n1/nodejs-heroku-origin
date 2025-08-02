import jwt from 'jsonwebtoken'

import { auth } from '@/middleware'

import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { resolveRefreshToken, setupSessionToken } from '../../services/token-service'
import { ServerStatus } from '../../services/types'

import { validateSessionId } from './service/validateSessionId'

import type { IKzenUser } from '../../services/types'
import type { Express, Response, Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

/* autologin */
export const userLoginRefresh = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN_REFRESH, auth, async function (req: Request, res: Response) {
        const { sessionJWT: requestSessionJWT } = req.body
        const refreshSecret = process.env.JWT_REFRESH_SECRET

        if (!requestSessionJWT || !refreshSecret) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        let decoded: string | JwtPayload | undefined

        try {
            decoded = jwt.verify(requestSessionJWT, refreshSecret) as JwtPayload
        } catch (e) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        const sessionId: string | undefined = decoded?.sessionId

        if (!sessionId) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        const user: IKzenUser | undefined = await validateSessionId(sessionId)

        if (!user) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        /* *** */
        const sessionData = await resolveRefreshToken({ user, sessionId })
        const sessionJWT = setupSessionToken({ sessionId: sessionData.sessionId })
        res.status(200).send({ message: ServerStatus.success, accessJWT: sessionData.accessJWT, sessionJWT })
    })
}
