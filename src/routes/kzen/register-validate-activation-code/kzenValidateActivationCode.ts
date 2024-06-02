import { activationCodeSchema } from '@/types'
import { auth } from '@/utilities/auth'
import type { Express, Response, Request } from 'express'

import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'
import { handleErrors } from '../register/helpers/handleErrors'
import { RegisterStatus } from '../register/types'

export const kzenValidateActivationCode = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_VALIDATE_ACTIVATION_CODE, auth, async function (req: Request, res: Response) {
        try {
            const result = activationCodeSchema.safeParse(req.body)
            if (!result.success) {
                return res.status(400).send({ status: RegisterStatus.failed })
            }

            const activationCode = result.data.activationCode
            console.log('activationCode', activationCode)

            // TODO
            // find email by activation Code in restore codes
            // if all is ok, change activated to true
            // update tokens and send data to front end

            // if not ok than data was deleted and user must register again
            // will need to return that the registration failed and user must start the registration process again

            res.status(200).send({ status: RegisterStatus.success })
        } catch (error) {
            return handleErrors(error, res)
        }
    })
}
