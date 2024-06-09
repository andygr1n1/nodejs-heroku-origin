import type { Express } from 'express'

import { kZenAutoRitualizeGoal } from './auto-ritualize-goals/kZenAutoRitualizeGoal.route'
import { kZenDeleteImageFromServer } from './delete-image-from-server/kZenDeleteImageFromServer'
import { kZenDestroyData } from './destroy-data/kZenDestroyData'
import { kZenLogin } from './login/kzenLogin'
import { kzenLoginGoogle } from './login-google/kzenLoginGoogle'
import { kzenRestore } from './restore/kzenRestore'
import { kZenUploadImageToServer } from './upload-image-to-server/kZenUploadImageToServer'
import { userActivation } from './user-activation'
import { userRegistration } from './user-registration'
import { userResendActivationLink } from './user-resend-activation-link'
import { KZEN_ROUTE_ENUM } from '../utilities/enums'

export const useKzenRoutes = (app: Express) => {
    /* routes */
    userRegistration(app)

    userResendActivationLink(app)

    userActivation(app)

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
}
