import { auth, Zerr } from '@/middleware'

import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { ServerStatus } from '../../services/types'

import { getUserInformation } from './helpers'

import type { Express, Response, Request } from 'express'

export const userGetInformation = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.USER_GET_INFORMATION, auth, async function (req: Request, res: Response) {
        console.log('qwdqdqwdqw')
        const user = await getUserInformation(req)
        if (!user) {
            throw Zerr({
                message: 'User get information failed',
                status: 422,
                path: ['userGetInformation'],
            })
        }
        console.log('user', user)
        res.status(200).send({ message: ServerStatus.success, user })
    })
}
