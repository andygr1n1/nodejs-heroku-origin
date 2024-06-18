import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { validateSessionId } from './service/validateSessionId'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { resolveRefreshToken, setupHttpCookie } from '../../services/token-service'
import type { IKzenUser } from '../../services/types'
import { ServerStatus } from '../../services/types'

/* using sessionId from req.cookies to validate user */
export const userLoginRefresh = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN_REFRESH, auth, async function (req: Request, res: Response) {
        const { sessionId } = req.cookies
        console.log('sessionId->>', sessionId)

        if (!sessionId) {
            return res.status(200).send({ message: 'Unauthorized' })
        }

        console.log('here', sessionId)

        const user: IKzenUser | undefined = await validateSessionId(sessionId)

        if (!user) {
            return res.status(401).send()
        }

        /* *** */
        const sessionData = await resolveRefreshToken({ user, sessionId })
        setupHttpCookie(res, sessionData.sessionId)
        res.status(200).send({ message: ServerStatus.success, accessId: sessionData.accessId })
    })
}
