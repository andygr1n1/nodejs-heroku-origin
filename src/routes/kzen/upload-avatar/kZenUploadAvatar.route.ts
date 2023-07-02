import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import fetch from 'node-fetch'
import { auth } from '../../../utils/auth.js'
import { updateUserAvatar } from './service/updateUserAvatar.service.js'

export const kZenUploadAvatar = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.IMG_UPLOAD_AVATAR, auth, async function (req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw { msg: 'no upload files' }
            }

            const FileData = req.files
            const fileId = Object.keys(FileData)[0]
            const file = FileData[fileId]

            if (!Array.isArray(file) && fileId) {
                const fileBuffer: Buffer = file.data
                const fileName: string = fileId + file.name

                const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY
                if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

                const body = fileBuffer
                const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/avatars/${fileName}`
                const options = {
                    method: 'PUT',
                    headers: {
                        AccessKey,
                        'content-type': 'application/octet-stream',
                    },
                    body,
                }

                await fetch(url, options)
                    .then(() => {
                        updateUserAvatar(fileId, fileName)
                    })
                    .then(() =>
                        res.status(201).send({
                            fileName,
                            status: 201,
                        }),
                    )
                    .catch((err) => console.error('error:' + err))
            } else {
                throw { msg: 'array upload functionality is disabled' }
            }
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
