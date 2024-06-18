import type { IKzenUser } from '@/apps/kzen/services/types'
import { kzenUserRegisterSchema } from '@/apps/kzen/services/types'
import bcrypt from 'bcryptjs'
import type { Request } from 'express'

import { mutation_InsertUser } from '../../../services/graphql-service/mutation_InsertUser'
export const userRegister = async (req: Request): Promise<IKzenUser | undefined> => {
    const userFormData = kzenUserRegisterSchema.parse(req.body)

    /* hashed password is also an activation link */
    userFormData.password = bcrypt.hashSync(req.body.password, 10)

    const user = await mutation_InsertUser(userFormData)

    return user
}
