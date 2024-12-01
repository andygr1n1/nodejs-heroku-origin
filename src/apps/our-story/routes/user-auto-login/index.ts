import { ServerStatus } from '@/apps/kzen/services/types'
import { auth } from '@/middleware'
import type { Express, Response, Request } from 'express'

import { testAuthorization } from './helpers/testAuthorization'
import { validateIdentity } from './service/validateIdentity'
import { OUR_STORY_ROUTE_ENUM } from '../../services/enums'
import { guestTokenizer } from '../../services/guest-tokenizer'

/* autologin */
export const userAutoLogin = (app: Express) => {
    app.post(OUR_STORY_ROUTE_ENUM.AUTO_LOGIN, auth, async function (req: Request, res: Response) {
        const { sessionJWT: requestSessionJWT, registrationId, bookingId } = req.body

        console.info('~~~~new request~~~')
        console.info('>>>>>>>>>>>>>--------------------------------')
        console.info('userAutoLogin', registrationId, bookingId)
        console.info('requestSessionJWT', requestSessionJWT)

        testAuthorization(req, res)

        const validationResult = await validateIdentity({ registrationId, bookingId, requestSessionJWT })

        if (!validationResult || !validationResult.id) {
            return res.status(200).send({ message: 'unauthorized' })
        }

        const isRegistered = validationResult.registration

        if (!bookingId && isRegistered && !requestSessionJWT) {
            console.info('booking-validation-required', registrationId)
            return res.status(200).send({ message: 'booking-validation-required' })
        }

        const sessionId: string | undefined = validationResult.id

        const guestTokens = guestTokenizer({
            id: sessionId,
            booking_number: validationResult.booking_number,
            registration: validationResult.registration,
            role: 'guest',
            'allowed-roles': ['guest'],
        })

        const clientData = {
            message: ServerStatus.success,
            accessJWT: guestTokens.accessToken,
            refreshJWT: guestTokens.refreshToken,
            registrationId: validationResult.id,
            bookingId: validationResult.booking_number,
            registration: validationResult.registration,
        }

        console.info('clientData', clientData, new Date().toISOString())
        console.info('--------------------------------<<<<<<<<<<<<<')
        return res.status(200).send(clientData)
    })
}
