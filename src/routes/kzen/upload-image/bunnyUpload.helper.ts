import fetch from 'node-fetch'
import fs from 'fs'

export const uploadToBunny = async (filepath: string, filename: string) => {
    const AccessKey = process.env.BUNNY_STORAGE_ACCESS_KEY

    if (!AccessKey) throw { message: 'AccessKey was not defined for Bunny connection' }

    const body = fs.readFileSync(filepath)
    const url = `${process.env.BUNNY_STORAGE_URL_KZEN}/${filename}`
    const options = {
        method: 'PUT',
        headers: {
            AccessKey,
            'content-type': 'application/octet-stream',
        },
        body,
    }

    try {
        const res = await fetch(url, options)

        return res.json()
    } catch (e) {
        return { status: 500, error: e }
    }
}
