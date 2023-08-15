import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import fetch from 'node-fetch'
import { auth } from '../../../utils/auth.js'

export const kzenSprintImageDelete = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.SPRINT_IMAGE_DELETE, auth, async function (req, res) {
        try {
            const imgTitle = req.body.imgTitle
            console.log('imgTitle', imgTitle)
            if (!imgTitle) {
                throw { msg: 'sprintImageDelete:bad data' }
            }

            const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/sprints/${imgTitle}`

            const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY
            if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

            const options = {
                method: 'DELETE',
                headers: {
                    AccessKey,
                    'content-type': 'application/octet-stream',
                },
            }

            await fetch(url, options)
                .then((json) => console.info(json))
                .then(() => res.status(200).send({ image: imgTitle, status: 201 }))
                .catch((err) => console.error('error:' + err))
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
