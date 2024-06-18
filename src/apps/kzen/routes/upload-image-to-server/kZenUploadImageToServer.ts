import { auth } from '@/middleware'
import crypto from 'crypto'
import type { Express } from 'express'
import fetch from 'node-fetch'

import type { KZEN_ROUTE_ENUM } from '../../services/enums'

export const kZenUploadImageToServer = (app: Express, route: KZEN_ROUTE_ENUM, folder: string) => {
    app.post(route, auth, async function (req, res) {
        try {
            const imgBase64 = req.body.base64
            const userId = req.body.userId

            if (!imgBase64 || !userId) {
                throw { msg: 'kZenUploadImageToServer:bad data' }
            }

            const base64Data = imgBase64.replace(/^data:image\/\w+;base64,/, '')
            const binaryImage = Buffer.from(base64Data, 'base64')
            const fileName = `${userId}_${crypto.randomUUID()}_${folder}.jpeg`

            const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY
            if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

            const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${folder}/${fileName}`
            const options = {
                method: 'PUT',
                headers: {
                    AccessKey,
                    'content-type': 'application/octet-stream',
                },
                body: binaryImage,
            }

            await fetch(url, options)
                .then(() =>
                    res.status(200).send({
                        fileName,
                        status: 200,
                    }),
                )
                .catch((err) => console.error('error:' + err))
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
