import cors from 'cors'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { errorHandling } from '../utils/errorHandling.js'
import 'express-async-errors'
import fileUpload from 'express-fileupload'

export const useAddons = (app: Express) => {
    app.use(express.json())
    app.use(cors())
    app.use(bodyParser.json())
    app.use(fileUpload())
    app.use('/public', express.static('public'))
    app.use('/storage/kzen-img', express.static('storage/kzen-img'))
}

export const useErrorHandling = (app: Express) => {
    app.use(errorHandling)
}
