import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

export const useAddons = (app: Express) => {
    app.use(express.json({ limit: '5mb' }))
    app.use(bodyParser.json())
    app.use(cors({ credentials: true, origin: (_origin, callback) => callback(null, true) }))
    app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }) as unknown as express.RequestHandler)
    app.use('/public', express.static('public'))
    app.use(cookieParser())
}
