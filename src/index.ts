import * as dotenv from 'dotenv'

import express from 'express'

import { auth, checkJwt } from './utils/auth.js'
import { useAddons, useErrorHandling } from './addons/addons.js'
import request from 'request'
import { itLoginRoute } from './routes/it-notebook/login-user/login.it.route.js'
import { itRegisterRoute } from './routes/it-notebook/register-user/register.it.route.js'
import { kZenAutoRitualizeGoal } from './routes/kzen/auto-ritualize-goals/kZenAutoRitualizeGoal.route.js'
import { kZenLogin } from './routes/kzen/login/kzenLogin.js'
import { kzenRegister } from './routes/kzen/register/kzenRegister.js'
import { kzenRestore } from './routes/kzen/restore/kzenRestore.js'
import { kZenDeleteImageFromServer } from './routes/kzen/delete-image-from-server/kZenDeleteImageFromServer.js'
import { KZEN_ROUTE_ENUM } from './routes/kzen/KZenRoute.enum.js'
import { kZenUploadImageToServer } from './routes/kzen/upload-image-to-server/kZenUploadImageToServer.js'
import { kZenDestroyData } from './routes/kzen/destroy-data/kZenDestroyData.js'

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

// it --- it --- it --- it ---it --- it --- it --- it
// it-register
itRegisterRoute(app)

// it-login
itLoginRoute(app)

// kzen --- kzen --- kzen --- kzen ---kzen --- kzen --- kzen --- kzen

kZenLogin(app)
kzenRegister(app)
kzenRestore(app)

// kzen upload/remove profile image
kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.PROFILE_IMAGE_UPLOAD, 'avatars')
kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.PROFILE_IMAGE_DELETE, 'avatars')

// kzen upload/remove sprint image
kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.SPRINT_IMAGE_UPLOAD, 'sprints')
kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.SPRINT_IMAGE_DELETE, 'sprints')

// kzen upload/goal-slide image
kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.GOAL_SLIDE_IMAGE_UPLOAD, 'goals-slides')
kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.GOAL_SLIDE_IMAGE_DELETE, 'goals-slides')

// kzen autoRitualizeGoal
kZenAutoRitualizeGoal(app)

kZenDestroyData(app)

/* app * app * app * app * app * app * app * app * app * app *  */
app.post('/articles', auth, (req, res) => res.send(req.body))

app.get('/articles', auth, (req, res) => res.send('articles!'))
app.get('/authorized', checkJwt, (req, res) => res.send('Secured Resource'))

app.get('/', (req, res) => {
    // console.info('req', req)
    // console.info('res', res)

    // res.send('Hello pro IT!')
    return res.json({ login: 'andrew', password: 'password' })
})

app.get('/errortest', (/* req, res */) => {
    // console.info('req', req)
    // console.info('res', res)

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
        console.info(body)
        res.send(body)
    })
})

/* app * app * app * app * app * app * app * app * app * app *  */
useErrorHandling(app)
app.listen(PORT, () => {
    console.info(`server is listening on port: ${PORT}`)
})
