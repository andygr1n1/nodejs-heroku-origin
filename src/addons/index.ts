import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

export const useAddons = (app: Express) => {
    app.use(express.json({ limit: '5mb' }))
    app.use(bodyParser.json())
    // app.use(cors(/* { credentials: true } */))

    // Define the array of allowed origins
    const allowedOrigins = process.env.CLIENT_ORIGINS?.split(',') || []

    app.use(
        cors({
            credentials: true,
            // origin: process.env.CLIENT_URL,
            origin: function (origin, callback) {
                if (!origin) {
                    callback(null, true)
                    return
                }

                // Check exact matches first
                if (allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true)
                    return
                }

                // Allow any localhost (any port and protocol)
                try {
                    const { hostname } = new URL(origin)
                    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1'
                    if (isLocalhost) {
                        callback(null, true)
                        return
                    }
                } catch {}

                // Check for wildcard patterns (e.g., http://192.168.*)
                const isWildcardMatch = allowedOrigins.some((allowedOrigin) => {
                    if (allowedOrigin.includes('*')) {
                        const pattern = allowedOrigin.replace(/\*/g, '.*')
                        const regex = new RegExp(`^${pattern}$`)
                        return regex.test(origin)
                    }
                    return false
                })

                if (isWildcardMatch) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
        }),
    )
    app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }))
    app.use('/public', express.static('public'))
    app.use(cookieParser())
}
