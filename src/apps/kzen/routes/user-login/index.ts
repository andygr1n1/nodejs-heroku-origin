import { Zerr, auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { loginSchema, type ILoginSchema } from './service/types'
import { validateUserCredentials } from './service/validateUserCredentials'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { resolveRefreshToken, setupSessionToken } from '../../services/token-service'
import type { IKzenUser } from '../../services/types'
import { ServerStatus } from '../../services/types'

/* using user credentials from login form to validate user */
export const userLogin = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN, auth, async function (req: Request, res: Response) {
        const userLoginData: ILoginSchema = loginSchema.parse(req.body)

        const user: IKzenUser | undefined = await validateUserCredentials(userLoginData)

        if (!user) {
            throw Zerr({
                path: ['userActivation', 'activatedUserData'],
                message: 'Invalid email or password',
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
