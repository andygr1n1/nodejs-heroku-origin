import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

const corsOptions: cors.CorsOptions = {
    credentials: true,
    origin: (_origin, callback) => callback(null, true),
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'x-api-key', 'Cookie'],
    optionsSuccessStatus: 204,
}

export const useAddons = (app: Express) => {
    /* CORS first so preflight (OPTIONS) is answered before body parsing / routes */
    app.use(cors(corsOptions))
    app.use(express.json({ limit: '5mb' }))
    app.use(bodyParser.json())
    app.use(fileUpload({ limits: { fileSize: 100 * 1024 * 1024 } }) as unknown as express.RequestHandler)
    app.use('/public', express.static('public'))
    app.use(cookieParser())
}
