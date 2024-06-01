import { buildTimeStamp } from '@/utilities'
import { CustomError } from '@/utilities/errorHandling'
import bcrypt from 'bcryptjs'
import type { Request } from 'express'

import { insertNewUser } from '../service/insertNewUser.mutation'
import { kzenRegisterSchema } from '../types'
export const registerNewUser = async (req: Request) => {
    const reqBody = kzenRegisterSchema.parse(req.body)
    // hashed password & activation link
    reqBody.password = bcrypt.hashSync(req.body.password, 10)

    const registeredUser = await insertNewUser(reqBody)

    if (!registeredUser) {
        console.info('User registration failed', reqBody, buildTimeStamp())
        throw new CustomError('User registration failed', 'failed', 401)
    }

    return registeredUser
}
