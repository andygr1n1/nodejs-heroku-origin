import { buildTimeStamp } from '@/utilities'
import { CustomError } from '@/utilities/errorHandling'
import type { Request } from 'express'

import { getIsUserRegistered } from '../service/getIsUserRegistered.query'
import { kzenRegisterSchema } from '../types'

export const isUserRegistered = async (req: Request) => {
    const reqBody = kzenRegisterSchema.parse(req.body)

    const isRegistered = await getIsUserRegistered(reqBody.email)

    if (isRegistered) {
        console.info('User is already registered', reqBody, buildTimeStamp())
        throw new CustomError('User is already registered', 'registered', 401)
    }
}
