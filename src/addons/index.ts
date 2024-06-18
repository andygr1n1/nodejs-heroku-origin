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
    app.use(
        cors({
            credentials: true,
            origin: process.env.CLIENT_URL,
        }),
    )
    app.use(fileUpload())
    app.use('/public', express.static('public'))
    app.use(cookieParser())
}
