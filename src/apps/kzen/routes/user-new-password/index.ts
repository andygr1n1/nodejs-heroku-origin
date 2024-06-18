import { Zerr, auth } from '@/middleware'
// import bcrypt from 'bcryptjs'
import type { Express } from 'express'

import { newPasswordSchema } from './service/types'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
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

        // const email = await query_emailByRestoreCode(newPasswordFormData.restoreCode)

        // if (email) {
        //     throw Zerr({
        //         path: ['userNewPassword', 'email'],
        //         message: `We don't recognize you. May be your link is expired. Please restart the process. Thank you!`,
        //         status: 422,
        //     })
        // }

        // await mutation_updatePasswordByEmail(email, bcrypt.hashSync(newPasswordFormData.password, 10))

        res.status(200).send({ message: ServerStatus.success })
    })
}
