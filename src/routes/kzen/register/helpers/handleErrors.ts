import { CustomError } from '@/utilities/errorHandling'
import { type Response } from 'express'
import { z } from 'zod'

import { RegisterStatus } from '../types'

export const handleErrors = (error: unknown, res: Response) => {
    if (error instanceof z.ZodError) {
        // Handle Zod validation error
        return res.status(400).send({ status: RegisterStatus.failed, error: error.errors })
    }
    if (error instanceof CustomError) {
        return res.status(error.errorCode).send({ status: error.type, error: [{ message: error.message }] })
    }
    return res.status(401).send({ status: RegisterStatus.failed })
}
