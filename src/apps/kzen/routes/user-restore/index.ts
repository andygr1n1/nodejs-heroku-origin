import { Zerr, auth } from '@/middleware'
import type { Express } from 'express'

import { deleteRestoreCode } from './service/mutation_deleteRestoreCode'
import { insertRestoreCode } from './service/mutation_insertRestoreCode'
import { sendActivationRestore } from './service/sendActivationRestore'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { query_userDataByEmail } from '../../services/graphql-service/query_userDataByEmail'
import { ServerStatus, emailSchema } from '../../services/types'

export const userRestore = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.RESTORE, auth, async function (req, res) {
        const emailFormData = emailSchema.parse(req.body)
        const email = emailFormData.email
        const user = await query_userDataByEmail(email)

        if (!user) {
            throw Zerr({
                path: ['userRestore'],
                message: "We don't recognize you. Please contact our support service",
                status: 422,
            })
        }

        const restoreCode = await insertRestoreCode(email)
        const restoreLink = `${process.env.KZEN_NEW_PASSWORD}?code=${restoreCode}`
        await sendActivationRestore(user, restoreLink)

        setTimeout(() => {
            restoreCode && deleteRestoreCode(restoreCode)
        }, 600000)

        res.status(200).send({ message: ServerStatus.success })
    })
}
