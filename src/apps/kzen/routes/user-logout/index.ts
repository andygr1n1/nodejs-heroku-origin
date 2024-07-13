import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { mutation_deleteSession } from '../../services/graphql-service/mutation_deleteSession'
import { ServerStatus } from '../../services/types'

/* using user credentials from login form to validate user */
export const userLogout = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGOUT, auth, async function (req: Request, res: Response) {
        const { sessionJWT } = req.body
        const refreshSecret = process.env.JWT_REFRESH_SECRET

        if (!sessionJWT || !refreshSecret) {
            return res.status(200).send({ message: 'userLogout without sessionJWT' })
        }

        let decoded: string | JwtPayload | undefined

        try {
            decoded = jwt.verify(sessionJWT, refreshSecret) as JwtPayload
        } catch (e) {
            return res.status(200).send({ message: 'userLogout without sessionJWT' })
        }

        const sessionId: string | undefined = decoded?.sessionId

        if (!sessionId) {
            return res.status(200).send({ message: 'userLogout without sessionJWT' })
        }
        console.log('sessionId', sessionId)
        sessionId && (await mutation_deleteSession(sessionId))

        res.status(200).send({ message: ServerStatus.success })
    })
}
