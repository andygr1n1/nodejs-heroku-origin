import { Zerr, auth } from '@/middleware'
import { emailSchema } from '@/utilities'
import type { Express, Response, Request } from 'express'

import { queryUserDataByEmail } from './service/query_UserDataByEmail'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'
import { sendActivationEmail } from '../register/helpers/sendActivationEmail'
import { RegisterStatus } from '../register/types'

export const kzenRegisterResendActivationLink = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_RESEND_ACTIVATION_LINK, auth, async function (req: Request, res: Response) {
        const result = emailSchema.parse(req.body)

        if (!result.email) {
            throw Zerr({
                message: 'Email is not valid',
                status: 401,
                path: ['kzenRegisterResendActivationLink', 'mailSchema.safeParse'],
            })
        }

        const email = result.email

        const user = await queryUserDataByEmail(email)

        if (!user) {
            throw Zerr({
                message: 'Email is not valid',
                status: 401,
                path: ['kzenRegisterResendActivationLink', 'mailSchema.safeParse'],
            })
        }

        await sendActivationEmail(user)

        res.status(200).send({ status: RegisterStatus.success })
    })
}
