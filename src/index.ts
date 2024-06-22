import * as dotenv from 'dotenv'
import express from 'express'

import { useAddons } from './addons'
import { useKzenRoutes } from './apps/kzen/routes/useKzenRoutes'
import { errorHandling } from './middleware'
import { envSchema } from './services/types'

/* configs */
dotenv.config()
/* Parse the environment variables */
envSchema.parse(process.env)
const PORT = process.env.PORT || 4554
const app = express()

useAddons(app)

useKzenRoutes(app)

app.get('/', (req, res) => {
    return res.json('Kzen drive')
})

app.use(errorHandling)

app.listen(PORT, () => {
    console.info(`KZen: ${PORT}`)
})
