import type { Express } from 'express'

import { userAutoLogin } from './user-auto-login'

export const useOurStoryRoutes = (app: Express) => {
    /* routes */
    userAutoLogin(app)
}
