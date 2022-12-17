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

export const createError = (status: number, message: string, requestId = '-1') => {
    return {
        status,
        errors: [
            {
                message,
                status,
            },
        ],
        requestId,
    }
}
