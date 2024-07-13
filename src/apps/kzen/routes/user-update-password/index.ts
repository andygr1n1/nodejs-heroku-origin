import { auth, Zerr } from '@/middleware'
import bcrypt from 'bcryptjs'
import type { Express } from 'express'

import { updatePasswordSchema } from './service/types'
import { KZEN_ROUTE_ENUM } from '../../services/enums'
import { query_userDataByEmail } from '../../services/graphql-service'
import { mutation_updatePasswordByEmail } from '../../services/graphql-service/mutation_updatePasswordByEmail'
import { ServerStatus } from '../../services/types'

export const userUpdatePassword = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.PROFILE_UPDATE_PASSWORD, auth, async function (req, res) {
        const newPasswordFormData = updatePasswordSchema.parse(req.body)

        const userData = await query_userDataByEmail(newPasswordFormData.email)

        if (!newPasswordFormData.password || !userData?.password) {
            throw Zerr({
                path: ['userUpdatePassword'],
                message: 'Password data is broken, please contact our support service',
                status: 422,
            })
        }

        const isMatch = await bcrypt.compare(newPasswordFormData.password, userData?.password)

        if (!isMatch) {
            throw Zerr({
                path: ['userUpdatePassword', 'isMatch'],
                message: 'Password does not match, please provide correct password',
                status: 422,
            })
        }

        await mutation_updatePasswordByEmail({
            email: newPasswordFormData.email,
            password: bcrypt.hashSync(newPasswordFormData.newPassword, 10),
        })

        res.status(200).send({ message: ServerStatus.success })
    })
}
