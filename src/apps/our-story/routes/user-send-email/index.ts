import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { sendInformationEmail } from './helpers/sendInformationEmail'
import { sendSuperUserEmail } from './helpers/sendSuperUserEmail'
import { OUR_STORY_ROUTE_ENUM } from '../../services/enums'

/* autologin */
export const userSendEmail = (app: Express) => {
    app.post(OUR_STORY_ROUTE_ENUM.USER_SEND_EMAIL, auth, async function (req: Request, res: Response) {
        const { emails, bookingId, language } = req.body

        const superUserEmails = ['andy.grini@gmail.com']

        await sendInformationEmail({ emails, bookingId, language })
        await sendSuperUserEmail({ superUserEmails, emails, bookingId })

        return res.status(200).send({ message: 'success' })
    })
}
