import { emailSchema } from '@/types'
import { auth } from '@/utilities/auth'
import { CustomError } from '@/utilities/errorHandling'
import type { Express, Response, Request } from 'express'

import { queryUserDataByEmail } from './service/query_UserDataByEmail'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'
import { handleErrors } from '../register/helpers/handleErrors'
import { sendActivationEmail } from '../register/helpers/sendActivationEmail'
import { RegisterStatus } from '../register/types'

export const kzenRegisterResendActivationLink = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_RESEND_ACTIVATION_LINK, auth, async function (req: Request, res: Response) {
        try {
            const result = emailSchema.safeParse(req.body)
            if (!result.success) {
                throw new CustomError('Email is not valid', 'failed', 401)
            }

            const email = result.data.email

            const user = await queryUserDataByEmail(email)

            if (!user) {
                throw new CustomError('User does not exit', 'failed', 401)
            }

            await sendActivationEmail(user)

            res.status(200).send({ status: RegisterStatus.success })
        } catch (error) {
            return handleErrors(error, res)
        }
    })
}
