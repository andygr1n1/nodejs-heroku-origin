import type { Express } from 'express'
import crypto from 'crypto'
import appRoot from 'app-root-path'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
// const __dirname = dirname(fileURLToPath(import.meta.url))

export const kZenUploadImage = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.IMG_UPLOAD, function (req, res) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw { msg: 'no upload files' }
            }

            const imageFile = req.files?.image
            if (!Array.isArray(imageFile)) {
                //
                const uploadPath = `${appRoot}/public/kzen-img/${crypto.randomUUID()}_crypto_${imageFile.name}`
                //
                imageFile.mv(uploadPath, function (err) {
                    if (err) return res.status(500).send(err)

                    res.send({ path: `${uploadPath.split('nodejs-heroku-origin/')[1]}`, status: 200 })
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
