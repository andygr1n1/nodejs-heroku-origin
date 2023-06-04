import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import { auth } from '../../../utils/auth.js'
import { fetchLoginUserData } from './service/fetchLoginUserData.query.js'
import { zonedTimeToUtc, format } from 'date-fns-tz'

interface IKzenLoginReqBody {
    email: string
    password: string
    remember: boolean
}

export const kZenLogin = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN, auth, async function (req, res) {
        // time log
        const timeZone = 'Europe/Lisbon'
        const zonedDate = zonedTimeToUtc(new Date(Date.now()), timeZone)
        const pattern = "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"
        //
        try {
            const reqBody: IKzenLoginReqBody = req.body
            const userId = await validateUser(reqBody.email, reqBody.password)
            if (!userId) throw new Error('Validation Failed')

            console.info('userLoginId:::', userId, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            res.status(200).send({ user_id: userId, remember: reqBody.remember })
        } catch (e) {
            console.info('userLoginId:::', e, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            return res.status(500).send(e)
        }
    })
}

const validateUser = async (email: string, password: string) => {
    return await fetchLoginUserData(email, password)
}
