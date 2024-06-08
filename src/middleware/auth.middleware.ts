// import * as dotenv from 'dotenv'
import type { NextFunction, Request, Response } from 'express'

/* configs */
// dotenv.config()

export const auth = (req: Request, res: Response, next: NextFunction) => {
    // x-api-key
    // if not x-api-key header
    // if not right key

    if (!req.header('x-api-key') || req.header('x-api-key') !== process.env.X_API_KEY) {
        // not authorized status
        res.status(401)
        return res.json({ message: 'X_API_KEY is invalid' })
    }
    // res.status(200).send(
    //     getJwtTokenSign({ email: 'andy.grini@gmail.com', name: 'andrei', password: '1231', id: 'xxx' }),
    // )
    next()
}
