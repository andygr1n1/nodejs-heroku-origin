import type { NextFunction, Request, Response } from 'express'

export const errorHandling = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        next(error)
    } else {
        res.status(500)
        res.json({
            message: error.message,
            ...(process.env.NODE_ENV === 'production' ? null : { stask: error.stack }),
        })
    }
}

export class CustomError extends Error {
    type: string
    errorCode: number

    constructor(message: string, type: string, errorCode: number) {
        super(message)
        this.name = this.constructor.name
        this.type = type
        this.errorCode = errorCode
    }
}
