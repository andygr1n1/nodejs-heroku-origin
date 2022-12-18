import * as dotenv from 'dotenv'

import express from 'express'
import { auth, checkJwt, checkJwtBySecretKey } from './utils/auth.js'
import { useAddons, useErrorHandling } from './addons/addons.js'
import request from 'request'
import { itLoginRoute } from './routes/it-notebook/login-user/login.it.route.js'
import { itRegisterRoute } from './routes/it-notebook/register-user/register.it.route.js'
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'
// const __dirname = dirname(fileURLToPath(import.meta.url))

/* configs */
dotenv.config()
const PORT = process.env.PORT || 4554
const AUTH0_JWKS_URI = process.env.AUTH0_JWKS_URI
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE
const AUTH0_ISSUER = process.env.AUTH0_ISSUER
const X_API_KEY = process.env.X_API_KEY
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
/* configs */

if (!AUTH0_JWKS_URI || !AUTH0_AUDIENCE || !AUTH0_ISSUER || !X_API_KEY || !JWT_SECRET_KEY) {
    throw new Error('ENV HAS BEEN BROKEN')
}

const app = express()

useAddons(app)

// login
itRegisterRoute(app)

// login
itLoginRoute(app)

/* app * app * app * app * app * app * app * app * app * app *  */
app.post('/articles', auth, (req, res) => res.send(req.body))

app.get('/articles', auth, (req, res) => res.send('articles!'))
app.get('/authorized', checkJwt, (req, res) => res.send('Secured Resource'))
app.get('/xroute', checkJwtBySecretKey, (req, res) => res.send('xroute has been opened'))

app.get('/', (req, res) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    return res.json({ login: 'andrew', password: 'password' })
})

app.get('/errortest', (/* req, res */) => {
    // console.log('req', req)
    // console.log('res', res)

    // res.send('Hello pro IT!')
    throw new Error('Oh no, this is a backend error')
})

app.get('/authorized-token', (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://dev-8kfuj05wdpybj2ua.eu.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        body: `
        {
            "client_id":"${AUTH0_CLIENT_ID}",
            "client_secret":"${AUTH0_CLIENT_SECRET}",
            "audience":"${AUTH0_AUDIENCE}",
            "grant_type":"client_credentials",
        }`,
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
