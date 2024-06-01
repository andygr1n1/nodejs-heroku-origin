import { errorHandling } from '@/utilities/errorHandling'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Express } from 'express'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

export const useAddons = (app: Express) => {
    app.use(express.json())
    app.use(cookieParser())
    app.use(bodyParser.json())
    app.use(cors())
    app.use(fileUpload())
    app.use('/public', express.static('public'))
    app.use('/storage/kzen-img', express.static('storage/kzen-img'))
}

export const useErrorHandling = (app: Express) => {
    app.use(errorHandling)
}
