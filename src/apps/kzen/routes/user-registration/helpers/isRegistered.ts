import { kzenUserRegisterSchema } from '@/apps/kzen/services/types'
import { Zerr } from '@/middleware'
import type { Request } from 'express'

import { query_isRegistered } from '../../../services/graphql-service/query_isRegistered'

export const isRegistered = async (req: Request) => {
    const user = kzenUserRegisterSchema.parse(req.body)

    const isRegistered = await query_isRegistered(user.email)

    if (isRegistered) throw Zerr({ message: 'User is already registered', path: ['isUserRegistered'], status: 422 })
}
