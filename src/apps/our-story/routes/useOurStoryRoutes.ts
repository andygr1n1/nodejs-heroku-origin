import type { Express } from 'express'

import { userAutoLogin } from './user-auto-login'
import { userSendEmail } from './user-send-email'

export const useOurStoryRoutes = (app: Express) => {
    /* routes */
    userAutoLogin(app)
    userSendEmail(app)
}
