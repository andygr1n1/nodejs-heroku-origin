import { Zerr, auth } from '@/middleware'
import bcrypt from 'bcryptjs'
import type { Express } from 'express'

import { newPasswordSchema } from './service/types'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { mutation_updatePasswordByEmail } from '../../services/graphql-service/mutation_updatePasswordByEmail'
import { query_emailByRestoreCode } from '../../services/graphql-service/query_emailByRestoreCode'
import { ServerStatus } from '../../services/types'

export const userNewPassword = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.NEW_PASSWORD, auth, async function (req, res) {
        const newPasswordFormData = newPasswordSchema.parse(req.body)

        if (newPasswordFormData.password !== newPasswordFormData.passwordRepeat) {
            throw Zerr({
                path: ['userNewPassword'],
                message: 'Passwords do not match',
                status: 422,
            })
        }

        const emailResponse = await query_emailByRestoreCode(newPasswordFormData.restoreCode)

        if (!emailResponse?.email) {
            throw Zerr({
                path: ['userNewPassword', 'email'],
                message: `We don't recognize you. May be your link is expired. Please restart the process. Thank you!`,
                status: 422,
            })
        }

        await mutation_updatePasswordByEmail({
            email: emailResponse.email,
            password: bcrypt.hashSync(newPasswordFormData.password, 10),
        })

        res.status(200).send({ message: ServerStatus.success })
    })
}
