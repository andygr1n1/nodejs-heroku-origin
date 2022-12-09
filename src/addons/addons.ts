import cors from 'cors'
import express, { Express } from 'express'

export const useAddons = (app: Express) => {
    app.use(express.json())
    app.use(cors())
    app.use('/', express.static('public'))
}
