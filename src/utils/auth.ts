import type { NextFunction, Request, Response } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
    // x-api-key
    // if not x-api-key header
    // if not right key

    if (!req.header('x-api-key') || req.header('x-api-key') !== '022-56-90-13') {
        // not authorized status
        res.status(401)
        return res.json({ message: 'x-api-key is invalid' })
    }

    next()
}
