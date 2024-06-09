import { auth } from '@/middleware'
import bcrypt from 'bcryptjs'
import type { Express } from 'express'

import { getPasswordByEmail } from './service/fetchLoginUserData.query'
import { KZEN_ROUTE_ENUM } from '../../utilities/enums'

interface IKzenLoginReqBody {
    email: string
    password: string
    remember: boolean
}

export const kZenLogin = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN, auth, async function (req, res) {
        // time log
        // const timeZone = 'Europe/Lisbon'
        // const zonedDate = zonedTimeToUtc(new Date(Date.now()), timeZone)
        // const pattern = "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"
        //

        try {
            const reqBody: IKzenLoginReqBody = req.body

            const userId = await validateUser(reqBody.email, reqBody.password)
            if (!userId) throw new Error('Validation Failed')

            // console.info('userLoginId:::', userId, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            res.status(200).send({ user_id: userId, remember: reqBody.remember })
        } catch (e) {
            // console.info('userLoginId:::', e, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            return res.status(401).send('unauthorized')
        }
    })
}

const validateUser = async (email: string, password: string): Promise<string | undefined> => {
    const data = await getPasswordByEmail(email)
    if (!data) return
    // Compare the entered password with the stored hash
    const isMatch = bcrypt.compareSync(password, data?.password)
    return isMatch ? data.id : undefined
}
