import * as dotenv from 'dotenv'
import express from 'express'

import { useAddons, useErrorHandler } from './addons'
import { kZenAutoRitualizeGoal } from './routes/kzen/auto-ritualize-goals/kZenAutoRitualizeGoal.route'
import { kZenDeleteImageFromServer } from './routes/kzen/delete-image-from-server/kZenDeleteImageFromServer'
import { kZenDestroyData } from './routes/kzen/destroy-data/kZenDestroyData'
import { KZEN_ROUTE_ENUM } from './routes/kzen/KZenRoute.enum'
import { kZenLogin } from './routes/kzen/login/kzenLogin'
import { kzenLoginGoogle } from './routes/kzen/login-google/kzenLoginGoogle'
import { kzenRegister } from './routes/kzen/register/kzenRegister'
import { kzenRegisterResendActivationLink } from './routes/kzen/register-resend-activation-link/kzenRegisterResendActivationLink'
import { kzenValidateActivationCode } from './routes/kzen/register-validate-activation-code/kzenValidateActivationCode'
import { kzenRestore } from './routes/kzen/restore/kzenRestore'
import { kZenUploadImageToServer } from './routes/kzen/upload-image-to-server/kZenUploadImageToServer'
import { envSchema } from './utilities'

/* configs */
dotenv.config()
/* Parse the environment variables */
envSchema.parse(process.env)
const PORT = process.env.PORT || 4554
const app = express()

useAddons(app)

/* routes */
kzenRegister(app)
kzenRegisterResendActivationLink(app)
kzenValidateActivationCode(app)
kZenLogin(app)
kzenLoginGoogle(app)
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

app.get('/', (req, res) => {
    // res.send('Hello pro IT!')
    return res.json({ login: 'andrew', password: 'password' })
})

useErrorHandler(app)

app.listen(PORT, () => {
    console.info(`KZen: ${PORT}`)
})
