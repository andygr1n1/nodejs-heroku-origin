import type { Express } from 'express'
import fetch from 'node-fetch'

import type { KZEN_ROUTE_ENUM } from '../../services/enums'

export const kZenDeleteImageFromServer = (app: Express, route: KZEN_ROUTE_ENUM, folder?: string) => {
    app.post(route, async function (req, res) {
        try {
            const storageFolder = folder || req.body?.table?.name
            const imgTitle = req.body?.event?.data?.old?.img_path || req.body.imgTitle

            console.log('---kZenDeleteImageFromServer---')
            console.log('storageFolder', storageFolder)
            console.log('imgTitle', imgTitle)

            if (!imgTitle) {
                throw { msg: 'kZenProfileImageDelete:bad data' }
            }

            const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${storageFolder}/${imgTitle}`

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
                .then((json) => {
                    console.info(json.status)
                    console.log('-------------------------------')
                })
                .then(() => res.status(200).send({ image: imgTitle, status: 'success' }))
                .catch((err) => console.error('error:' + err))
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
