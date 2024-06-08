import bcrypt from 'bcryptjs'
import type { Request } from 'express'

import { insertNewUser } from '../service/insertNewUser.mutation'
import type { INewUser } from '../types'
import { kzenRegisterSchema } from '../types'
export const registerNewUser = async (req: Request): Promise<INewUser | undefined> => {
    const reqBody = kzenRegisterSchema.parse(req.body)
    // hashed password & activation link
    reqBody.password = bcrypt.hashSync(req.body.password, 10)

    const registeredUser = await insertNewUser(reqBody)

    return registeredUser
}
