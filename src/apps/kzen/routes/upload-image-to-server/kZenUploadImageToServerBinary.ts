import crypto from 'crypto'

import fetch from 'node-fetch'

import { auth } from '@/middleware'

import type { KZEN_ROUTE_ENUM } from '../../services/enums'
import type { Express } from 'express'
import type { UploadedFile } from 'express-fileupload'

export const kZenUploadImageToServerBinary = (app: Express, route: KZEN_ROUTE_ENUM) => {
    app.post(route, auth, async function (req, res) {
        try {
            const fileField = req.files?.binary
            const uploadedFile: UploadedFile | undefined = Array.isArray(fileField) ? fileField[0] : fileField
            const userId = req.body.userId
            const folder = req.body.folder

            if (!uploadedFile || !userId) {
                throw { msg: 'kZenUploadImageToServer:bad data' }
            }

            if (!folder) {
                throw { msg: 'kZenUploadImageToServerBinary:folder is required' }
            }

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
                body: uploadedFile.data,
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
