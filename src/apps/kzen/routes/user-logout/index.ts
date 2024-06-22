import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { mutation_deleteSession } from '../../services/graphql-service/mutation_deleteSession'
import { ServerStatus } from '../../services/types'

/* using user credentials from login form to validate user */
export const userLogout = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGOUT, auth, async function (req: Request, res: Response) {
        const { sessionId } = req.cookies

        sessionId && (await mutation_deleteSession(sessionId))

        res.clearCookie('sessionId')
        res.status(200).send({ message: ServerStatus.success })
    })
}
