import { userAutoLogin } from './user-auto-login'
import { userSendEmail } from './user-send-email'

import type { Express } from 'express'

export const useOurStoryRoutes = (app: Express) => {
    /* routes */
    userAutoLogin(app)
    userSendEmail(app)
}
