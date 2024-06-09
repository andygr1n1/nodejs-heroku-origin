import { auth, Zerr } from '@/middleware'
import { activationCodeSchema } from '@/utilities'
import type { Express, Response, Request } from 'express'

import { mutation_activateUser } from '../../services/graphql-service/mutation_activateUser'
import { saveRefreshToken } from '../../services/token-service'
import { setupHttpCookie } from '../../services/token-service/setupHttpCookie'
import { KZEN_ROUTE_ENUM } from '../../utilities/enums'
import type { IAccessKeys } from '../../utilities/types'
import { ServerStatus } from '../../utilities/types'

export const userActivation = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_VALIDATE_ACTIVATION_CODE, auth, async function (req: Request, res: Response) {
        const result = activationCodeSchema.parse(req.body)

        const user = await mutation_activateUser(result.activationCode)

        if (!user) {
            throw Zerr({
                path: ['userActivation', 'activatedUserData'],
                message:
                    "Activation code is wrong or expired. If you didn't complete the registration, please try again",
                status: 422,
            })
        }

        const sessionData = await saveRefreshToken(user)

        const sessionInfo: IAccessKeys = {
            accessId: sessionData.accessId,
        }

        /* *** */
        setupHttpCookie(res, sessionData.sessionId)
        res.status(200).send({ message: ServerStatus.success, sessionInfo })
    })
}
