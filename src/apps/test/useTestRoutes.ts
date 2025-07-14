import os from 'os'

import type { Express } from 'express'
export const useTestRoutes = (app: Express) => {
    app.get('/version', (req, res) => {
        return res.json(`🚘 Kzen drive 🚘 version 3.0.0 ${os.hostname()} ${new Date().toISOString()}`)
    })
}
