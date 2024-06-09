import { Zerr, auth } from '@/middleware'
import { emailSchema } from '@/utilities'
import type { Express, Response, Request } from 'express'

import { sendActivationEmail } from '../../services/email-service/sendActivationEmail'
import { query_userDataByEmail } from '../../services/graphql-service/query_userDataByEmail'
import { KZEN_ROUTE_ENUM } from '../../utilities/enums'
import { ServerStatus } from '../../utilities/types'

export const userResendActivationLink = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER_RESEND_ACTIVATION_LINK, auth, async function (req: Request, res: Response) {
        const result = emailSchema.parse(req.body)

        if (!result.email) {
            throw Zerr({
                message: 'Email is not valid',
                status: 422,
                path: ['userResendActivationLink', 'mailSchema.safeParse'],
            })
        }

        const user = await query_userDataByEmail(result.email)

        if (!user) {
            throw Zerr({
                message: 'User not found',
                status: 422,
                path: ['userResendActivationLink', 'queryUserDataByEmail'],
            })
        }

        await sendActivationEmail(user)

        res.status(200).send({ message: ServerStatus.success })
    })
}
