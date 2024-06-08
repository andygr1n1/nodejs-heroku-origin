import { Zerr } from '@/middleware'
import type { Request } from 'express'

import { getIsUserRegistered } from '../service/getIsUserRegistered.query'
import { kzenRegisterSchema } from '../types'

export const isUserRegistered = async (req: Request) => {
    const reqBody = kzenRegisterSchema.parse(req.body)

    const isRegistered = await getIsUserRegistered(reqBody.email)
    !isRegistered && Zerr({ message: 'User is already registered', path: ['isUserRegistered'], status: 401 })
}
