import { buildTimeStamp } from '@/services/helpers'
import type { NextFunction, Request, Response } from 'express'
import { ZodError, z, type ZodIssue } from 'zod'

type IThrowError = {
    errors: ZodIssue & { params: { status: number }; message: string }[]
}

export function isCustomZodError(error: unknown): error is IThrowError {
    return error instanceof z.ZodError
}

export const errorHandling = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (isCustomZodError(error)) {
        const errorData = error.errors?.[0]
        const errorCodeStatus: number = error.errors?.[0]?.params?.status
        const message = errorData.message
        /*  */
        console.info(`${buildTimeStamp()} --- ERROR HANDLING ---`, errorData)
        /*  */

        if (!errorData || !errorCodeStatus) {
            return res.status(422).send({ message: 'Temporarily unable to handle the request' })
        } else {
            return res.status(errorCodeStatus).send({ message })
        }
    }

    if (res.headersSent) {
        next(error)
    } else {
        return res.status(422).send({ message: 'Temporarily unable to handle the request' })
    }
}

// Zod error
export const Zerr = (props: { path: string[]; message: string; status: number }) => {
    const { path, message, status } = props
    return new ZodError([
        {
            path,
            message,
            code: 'custom',
            params: { status },
        },
    ])
}
