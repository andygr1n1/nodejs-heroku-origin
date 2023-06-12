import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import { auth } from '../../../utils/auth.js'
import { insertNewUser } from './service/insertNewUser.query.js'
import { zonedTimeToUtc, format } from 'date-fns-tz'

export interface IKzenRegisterReqBody {
    email: string
    password: string
    name: string
}

export const kzenRegister = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.REGISTER, auth, async function (req, res) {
        // time log
        const timeZone = 'Europe/Lisbon'
        const zonedDate = zonedTimeToUtc(new Date(Date.now()), timeZone)
        const pattern = "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"
        //
        try {
            const reqBody: IKzenRegisterReqBody = req.body
            const userId = await insertNewUser(reqBody)
            if (!userId) throw new Error(`Registration Failed on ${reqBody}`)

            console.info('new user id:::', userId, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            res.status(200).send({ user_id: userId, remember: false })
        } catch (e) {
            console.info('kzenRegister:::', e, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            return res.status(401).send('unauthorized')
        }
    })
}
