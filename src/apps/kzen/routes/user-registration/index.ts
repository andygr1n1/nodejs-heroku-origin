import { auth, Zerr } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { isRegistered, registerUser } from './helpers'
import { sendActivationEmail } from '../../services/email-service/sendActivationEmail'
import { KZEN_ROUTE_ENUM } from '../../utilities/enums'
import { ServerStatus } from '../../utilities/types'

export const userRegistration = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER, auth, async function (req: Request, res: Response) {
        await isRegistered(req)

        const user = await registerUser(req)

        if (!user) {
            throw Zerr({
                message: 'User registration failed',
                status: 422,
                path: ['userRegistration', 'registerNewUser'],
            })
        }

        await sendActivationEmail(user)

        res.status(200).send({ message: ServerStatus.success })
    })
}
