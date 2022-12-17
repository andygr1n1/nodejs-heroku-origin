import type { Express } from 'express'
import { createError } from '../../../utils/errorHandling.js'
import { getJwtTokenSign } from '../../../utils/jwt-token-sign.js'
import type { User } from '../../../xata.js'
import { IT_NOTEBOOK_ROUTE_ENUM } from '../itNotebookRoute.enum.js'
import { createUser } from './createUser.xata.js'

export const itRegisterRoute = (app: Express) => {
    app.post(IT_NOTEBOOK_ROUTE_ENUM.REGISTER, async (req, res) => {
        const newUser: User = {
            name: req.body.username,
            password: req.body.passw,
            email: req.body.email,
            id: '-1',
        }

        try {
            if (!newUser.password || !newUser.email) {
                return res.status(401).send(createError(401, 'itRegisterRoute Error: password or email is empty'))
            }

            const record = await createUser(newUser)

            if (!record) throw new Error(record)

            res.status(200).send(getJwtTokenSign(record))
        } catch (e) {
            return res.status(401).send(e)
        }
    })
}
