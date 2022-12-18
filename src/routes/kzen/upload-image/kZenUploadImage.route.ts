import type { Express } from 'express'
import crypto from 'crypto'
import appRoot from 'app-root-path'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import fs from 'fs'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
// const __dirname = dirname(fileURLToPath(import.meta.url))

const createKzenStorage = (kZenStorage: string) => {
    if (!fs.existsSync(kZenStorage)) {
        fs.mkdirSync(kZenStorage, { recursive: true })
    }
}

export const kZenUploadImage = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.IMG_UPLOAD, function (req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw { msg: 'no upload files' }
            }

            const imageFile = req.files?.image
            if (!Array.isArray(imageFile)) {
                //
                const kZenStorage = `${appRoot}/storage/kzen-img/`
                createKzenStorage(kZenStorage)
                //
                const imgTitle = `${crypto.randomUUID()}_crypto_${imageFile.name}`
                const uploadPath = `${kZenStorage}${imgTitle}`
                //
                imageFile.mv(uploadPath, function (err) {
                    if (err) {
                        res.status(500).send({ err, description: 'imageFile.mv()', path: uploadPath })
                    }

                    res.status(200).send({ path: `storage/kzen-img/${imgTitle}`, status: 200 })
                })
            } else {
                throw { msg: 'array upload functionality is disabled' }
            }
        } catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    })
}
