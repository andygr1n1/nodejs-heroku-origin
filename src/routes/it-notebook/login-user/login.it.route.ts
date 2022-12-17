import { createError } from './../../../utils/errorHandling.js'
import type { Express } from 'express'
import { getJwtTokenSign } from '../../../utils/jwt-token-sign.js'
import type { User } from '../../../xata.js'
import { IT_NOTEBOOK_ROUTE_ENUM } from '../itNotebookRoute.enum.js'
import { getUser } from './getUser.xata.js'

export const itLoginRoute = (app: Express) => {
    app.post(IT_NOTEBOOK_ROUTE_ENUM.LOGIN, async (req, res) => {
        const loginUser: User = {
            name: '',
            password: req.body.passw,
            email: req.body.email,
            id: '',
        }

        // TODO to encrypt sensitive data

        const record = await getUser(loginUser)

        if (!record) return res.status(401).send(createError(401, 'Login error: user not found'))

        res.status(200).send(getJwtTokenSign(record))
    })
}
