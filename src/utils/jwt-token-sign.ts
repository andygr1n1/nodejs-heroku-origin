import jwt from 'jsonwebtoken'
import type { User } from '../xata'

export const getJwtTokenSign = (user: User): string => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

    // if (!JWT_SECRET_KEY) {
    //     res.status(400).send('server setup error #1')
    //     return
    // }

    if (!JWT_SECRET_KEY) {
        throw new Error('jwtTokenSign Error')
    }

    return jwt.sign(
        {
            sub: user.id,
            name: user.name,
            email: user.email,
        },
        JWT_SECRET_KEY,
        { expiresIn: '48 hours' }
    )
}
