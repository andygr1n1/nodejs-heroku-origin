import { auth, Zerr } from '@/middleware'
import { activationCodeSchema } from '@/utilities'
import type { Express, Response, Request } from 'express'

import { updateRefreshToken } from './helpers/updateRefreshToken'
import { validateRefreshToken } from './helpers/validateRefreshToken'
import { mutation_ActivateUser } from './service/mutation_ActivateUser'
import { query_UserByActivationCode } from './service/query_UserByActivationCode'
import type { IAccessKeys } from './types'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'
import { RegisterStatus } from '../register/types'

export const kzenValidateActivationCode = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_VALIDATE_ACTIVATION_CODE, auth, async function (req: Request, res: Response) {
        const result = activationCodeSchema.parse(req.body)
        if (!result?.activationCode) {
            throw Zerr({
                message: 'No activation code',
                path: ['kzenValidateActivationCode'],
                status: 422,
            })
        }
        const activationCode = result.activationCode
        const userDataByActivationCode = await query_UserByActivationCode(activationCode)

        if (!userDataByActivationCode) {
            throw Zerr({
                path: ['kzenValidateActivationCode', 'userDataByActivationCode'],
                message:
                    "Activation code is wrong or expired. If you didn't complete the registration, please try again",
                status: 422,
            })
        }

        const userRefreshToken = userDataByActivationCode.tokens?.[0].token

        validateRefreshToken(userRefreshToken)

        const activatedUserData = await mutation_ActivateUser(activationCode)

        if (!activatedUserData) {
            throw Zerr({
                path: ['kzenValidateActivationCode', 'activatedUserData'],
                message: 'Failed to activate user',
                status: 422,
            })
        }

        const tokens = await updateRefreshToken(activatedUserData)

        const sessionInfo: IAccessKeys = {
            heroId: activatedUserData.id,
            sessionId: activatedUserData?.tokens?.[0]?.session_id,
            accessId: tokens.accessToken,
        }

        res.status(200).send({ message: RegisterStatus.success, sessionInfo })
    })
}
