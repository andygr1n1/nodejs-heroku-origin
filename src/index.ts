// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'

import express from 'express'
import { auth } from './utils/auth.js'
import { errorHandling } from './utils/errorHandling.js'
import 'express-async-errors'
import { useAddons } from './addons/addons.js'
// const __dirname = dirname(fileURLToPath(import.meta.url))

/* configs */
dotenv.config()
const PORT = process.env.PORT || 4554
/* configs */

const app = express()

useAddons(app)

/* app * app * app * app * app * app * app * app * app * app *  */
app.post('/articles', auth, (req, res) => res.send(req.body))
app.get('/articles', auth, (req, res) => res.send('articles!'))

app.get('/', (req, res) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    return res.json({ login: 'andrew', password: 'password' })
})

app.get('/errortest', (req, res) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    throw new Error('Oh no, this is a backend error')
})

app.use(errorHandling)

console.log('S3_BUCKET', process.env.S3_BUCKET)

/* app * app * app * app * app * app * app * app * app * app *  */
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})
