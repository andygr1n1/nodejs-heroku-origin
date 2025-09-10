import fetch from 'node-fetch'
import sharp from 'sharp'

import { auth } from '@/middleware'

import { getFilesData } from './getFilesData'

import type { KZEN_ROUTE_ENUM } from '../../services/enums'
import type { Express } from 'express'

export const kZenUploadIMagesToCdn = (app: Express, route: KZEN_ROUTE_ENUM) => {
    app.post(route, auth, async function (req, res) {
        try {
            const userId = req.body.userId
            const folder = req.body.folder
            const files = req.files
            const imgPathsToDelete = req.body.imgPathsToDelete?.split(',').filter((path: string) => path.trim()) as
                | string[]
                | undefined

            const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY
            if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

            if (!userId) {
                throw { msg: 'kZenUploadIMagesToCdn:bad data' }
            }

            if (!folder) {
                throw { msg: 'kZenUploadIMagesToCdn:folder is required' }
            }

            const uploadPromises: Promise<fetch.Response | null>[] = []
            const deletePromises: Promise<fetch.Response | null>[] = []

            const filesData = getFilesData({ files, requestBody: req.body })

            for (const fileData of filesData) {
                const { path, file } = fileData

                const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${folder}/${path}`

                const imageFile = file.data

                const processedImagePromise = sharp(imageFile)
                    .resize(1920, 1080, {
                        fit: 'inside',
                        withoutEnlargement: true,
                    })
                    .jpeg({
                        quality: 100,
                        progressive: true,
                        mozjpeg: true,
                    })
                    .toBuffer()
                    .then(async (processedBuffer) => processedBuffer)
                    .catch(async (err) => {
                        console.error('Sharp processing error:', err)
                        // Fallback: try without resizing
                        try {
                            const fallbackBuffer = await sharp(imageFile)
                                .jpeg({
                                    quality: 100,
                                    progressive: true,
                                    mozjpeg: true,
                                })
                                .toBuffer()
                            return fallbackBuffer
                        } catch (fallbackErr) {
                            console.error('Fallback processing also failed:', fallbackErr)
                            return imageFile
                        }
                    })

                const uploadPromise = processedImagePromise.then(async (binaryImage) => {
                    const options = {
                        method: 'PUT',
                        headers: {
                            AccessKey,
                            'content-type': 'application/octet-stream',
                        },
                        body: binaryImage,
                    }

                    return fetch(url, options).catch((err) => {
                        console.error('upload error:', err)
                        return null
                    })
                })

                uploadPromises.push(uploadPromise)
            }

            if (imgPathsToDelete?.length) {
                for (const imgPath of imgPathsToDelete) {
                    const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${imgPath}`
                    const options = {
                        method: 'DELETE',
                        headers: {
                            AccessKey,
                            'content-type': 'application/octet-stream',
                        },
                    }

                    const deletePromise = fetch(url, options).catch((err) => {
                        console.error('delete error:', err)
                        return null
                    })
                    deletePromises.push(deletePromise)
                }
            }

            const uploadResult = await Promise.all([...uploadPromises, ...deletePromises])

            if (
                uploadResult.every(
                    (r) => (r as fetch.Response)?.status === 201 || (r as fetch.Response)?.status === 200,
                )
            ) {
                res.status(200).send({
                    status: 200,
                })
            } else {
                throw { msg: 'kZenUploadIMagesToCdn:uploadPromises error' }
            }
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}
