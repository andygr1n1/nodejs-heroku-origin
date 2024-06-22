import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

export const useAddons = (app: Express) => {
    app.use(express.json())
    app.use(bodyParser.json())
    // app.use(cors(/* { credentials: true } */))

    // Define the array of allowed origins
    const allowedOrigins = process.env.CLIENT_ORIGINS?.split(',') || []

    app.use(
        cors({
            credentials: true,
            // origin: process.env.CLIENT_URL,
            origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
        }),
    )
    app.use(fileUpload())
    app.use('/public', express.static('public'))
    app.use(cookieParser())
}
