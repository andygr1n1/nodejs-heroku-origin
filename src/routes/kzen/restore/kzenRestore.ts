import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import { auth } from '../../../utils/auth.js'
import { zonedTimeToUtc, format } from 'date-fns-tz'
import { sendEmail } from '../../../nodemailer/nodemailerService.js'
import { validateEmail } from './service/validateEmail.query.js'
import { insertRestoreCode } from './service/insertRestoreCode.mutation.js'
import { deleteRestoreCode } from './service/deleteRestoreCode.mutation.js'

interface IKzenRestoreReqBody {
    email: string
}

export const kzenRestore = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.RESTORE, auth, async function (req, res) {
        const timeZone = 'Europe/Lisbon'
        const zonedDate = zonedTimeToUtc(new Date(Date.now()), timeZone)
        const pattern = "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"

        try {
            const reqBody: IKzenRestoreReqBody = req.body
            const email = reqBody.email
            const isEMailValid = await validateEmail(email)
            if (isEMailValid) {
                const restoreCode = await insertRestoreCode(email)
                if (!restoreCode) throw new Error('insertRestoreCode error::: restoreCode is undefined')
                const restoreLink = `${process.env.KZEN_NEW_PASSWORD}?code=${restoreCode}`
                await sendEmail(reqBody.email, restoreLink).catch(console.error)
                setTimeout(() => {
                    deleteRestoreCode(restoreCode)
                }, 600000)
                res.status(200).send({ email })
            } else {
                res.status(200).send({ email_status: '404' })
            }
        } catch (e) {
            console.info('kzenRestore:::', e, format(zonedDate, pattern, { timeZone: 'Europe/Lisbon' }))
            return res.status(401).send('unauthorized')
        }
    })
}
