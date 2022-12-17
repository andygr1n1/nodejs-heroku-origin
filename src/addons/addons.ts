import cors from 'cors'
import express, { Express } from 'express'
import  bodyParser from 'body-parser'
import { errorHandling } from '../utils/errorHandling.js'
import 'express-async-errors'

export const useAddons = (app: Express) => {
    app.use(express.json())
    app.use(cors())
    app.use(bodyParser.json())
    app.use('/', express.static('public'))
}

export const useErrorHandling = (app: Express) => {
    app.use(errorHandling)
}
