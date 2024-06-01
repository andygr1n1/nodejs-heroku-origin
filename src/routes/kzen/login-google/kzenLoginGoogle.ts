import { auth } from '@/utilities/auth'
import { format } from 'date-fns'
import type { Express } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { z } from 'zod'

import { fetchUserIdByEmail } from './service/fetchUserIdByEmail'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum'

const requestBodySchema = z.object({
    accessToken: z.string(),
})

export const kzenLoginGoogle = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.LOGIN_GOOGLE, auth, async function (req, res) {
        const pattern = "dd.MM.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"

        try {
            // Validate the request body
            const validationResult = requestBodySchema.safeParse(req.body)
            if (!validationResult.success) {
                console.info('LOGIN ERROR ---userLoginId--- Invalid request body', format(new Date(), pattern))
                return res.status(400).send('Invalid request body')
            }

            const client = new OAuth2Client()

            const ticket = await client.getTokenInfo(req.body.accessToken)
            if (!ticket.email) throw new Error(`Validation Failed: ticket: ${ticket}`)

            const userId = await fetchUserIdByEmail(ticket.email)
            if (!userId) throw new Error(`Validation Failed: userId: ${userId} | ticket: ${ticket}`)

            const jwt = { email: ticket.email, userId }
            console.info('LOGIN SUCCESS ---userLoginId---', userId, ticket.email, format(new Date(), pattern))
            res.status(200).send({ jwt })
        } catch (e) {
            console.info('LOGIN ERROR ---userLoginId---', e, format(new Date(), pattern))
            return res.status(401).send('unauthorized')
        }
    })
}
