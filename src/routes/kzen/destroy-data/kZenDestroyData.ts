import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import { destroyDeletedDataMutation } from './helpers/destroyDeletedData.mutation.js'

export const kZenDestroyData = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.DESTROY_DATA_URL, async function (req, res) {
        destroyDeletedData()
        return res.status(200).send('success')
    })
}

export async function destroyDeletedData() {
    const res = await destroyDeletedDataMutation()
    console.log('#########destroyDeletedData###########')
    console.log('destroyDeletedData:', res)
    console.log('#########destroyDeletedData###########')
}
