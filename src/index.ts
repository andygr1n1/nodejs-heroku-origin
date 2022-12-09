import * as dotenv from 'dotenv'

import express from 'express'
import { auth, checkJwt } from './utils/auth.js'
import { useAddons, useErrorHandling } from './addons/addons.js'
import request from 'request'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
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
app.get('/authorized', checkJwt, (req, res) => res.send('Secured Resource'))

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

app.get('/authorized-token', (req, res) => {
    const client_id = process.env.AUTH0_CLIENT_ID
    const client_secret = process.env.AUTH0_CLIENT_SECRET
    var options = {
        method: 'POST',
        url: 'https://dev-8kfuj05wdpybj2ua.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"https://nodejs-heroku-origin.com","grant_type":"client_credentials"}`,
    }

    request(options, function (error, response, body) {
        if (error) throw new Error(error)
        console.log(body)
        res.send(body)
    })
})

/* app * app * app * app * app * app * app * app * app * app *  */
useErrorHandling(app)
app.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
})
