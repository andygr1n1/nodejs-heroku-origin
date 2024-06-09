import type { IKzenUserRegisterSchema } from '@/apps/kzen/utilities/types'
import { kzenUserRegisterSchema } from '@/apps/kzen/utilities/types'
import bcrypt from 'bcryptjs'
import type { Request } from 'express'

import { mutation_InsertUser } from '../../../services/graphql-service/mutation_InsertUser'
export const registerUser = async (req: Request): Promise<IKzenUserRegisterSchema | undefined> => {
    const userFormData = kzenUserRegisterSchema.parse(req.body)

    /* hashed password is also an activation link */
    userFormData.password = bcrypt.hashSync(req.body.password, 10)

    const user = await mutation_InsertUser(userFormData)

    return user
}
