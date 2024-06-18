import { auth, Zerr } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { mutation_activateUser } from '../../services/graphql-service/mutation_activateUser'
import { activationCodeSchema, ServerStatus } from '../../services/types'

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

        /* *** */
        res.status(200).send({ message: ServerStatus.success })
    })
}
