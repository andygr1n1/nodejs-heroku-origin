import { auth, Zerr } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { isUserRegistered, registerNewUser } from './helpers'
import { saveRefreshToken } from './helpers/saveRefreshToken'
import { sendActivationEmail } from './helpers/sendActivationEmail'
import { setupHttpCookie } from './helpers/setupHttpCookie'
import { RegisterStatus } from './types'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'

export const kzenRegister = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER, auth, async function (req: Request, res: Response) {
        await isUserRegistered(req)
        const registeredUser = await registerNewUser(req)
        if (!registeredUser) {
            throw Zerr({ message: 'User registration failed', path: ['registerNewUser'], status: 401 })
        }
        const tokens = await saveRefreshToken(registeredUser)
        await sendActivationEmail(registeredUser)
        /* *** */
        setupHttpCookie(res, tokens)
        res.status(200).send({ status: RegisterStatus.success, jwt: tokens.refreshToken })
    })
}
