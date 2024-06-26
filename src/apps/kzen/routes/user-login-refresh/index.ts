import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { validateSessionId } from './service/validateSessionId'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { resolveRefreshToken, setupHttpCookie } from '../../services/token-service'
import type { IKzenUser } from '../../services/types'
import { ServerStatus } from '../../services/types'
/* autologin */
/* using sessionId from req.cookies to validate user */
export const userLoginRefresh = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN_REFRESH, auth, async function (req: Request, res: Response) {
        const { sessionId } = req.cookies

        if (!sessionId) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        const user: IKzenUser | undefined = await validateSessionId(sessionId)
        console.log('sessionId', sessionId, user)
        if (!user) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        /* *** */
        const sessionData = await resolveRefreshToken({ user, sessionId })
        setupHttpCookie(res, sessionData.sessionId)
        res.status(200).send({ message: ServerStatus.success, accessId: sessionData.accessId })
    })
}
