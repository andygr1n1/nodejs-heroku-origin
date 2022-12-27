import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import fetch from 'node-fetch'
import fs from 'fs'
import appRoot from 'app-root-path'

export const kZenRemoveImage = (app: Express) => {
    app.delete(KZEN_ROUTE_ENUM.IMG_REMOVE, async function (req, res) {
        try {
            if (!req.body) {
                throw { msg: 'no image ID' }
            }
            const imgTitle = req.body.data

            const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY

            if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

            const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${imgTitle}`
            const options = {
                method: 'DELETE',
                headers: {
                    AccessKey,
                    'content-type': 'application/octet-stream',
                },
            }

            await fetch(url, options)
                .then((json) => console.log(json))
                .then(() => res.status(200).send({ image: imgTitle, status: 201 }))
                .catch((err) => console.error('error:' + err))

            const kZenStorage = `${appRoot}/storage/kzen-img/`

            fs.unlink(`${kZenStorage}${imgTitle}`, (e) => {
                if (e) return console.log(e)
                console.warn('image has been deleted successfully')
            })
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
