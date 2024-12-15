import type { Express } from 'express'

import { kZenAutoRitualizeGoal } from './auto-ritualize-goals/kZenAutoRitualizeGoal.route'
import { kZenDeleteImageFromServer } from './delete-image-from-server/kZenDeleteImageFromServer'
import { kZenDestroyData } from './destroy-data/kZenDestroyData'
import { kZenUploadImageToServer } from './upload-image-to-server/kZenUploadImageToServer'
import { userActivation } from './user-activation'
import { userGetInformation } from './user-get-information'
import { userLogin } from './user-login'
import { kzenLoginGoogle } from './user-login-google'
import { userLoginRefresh } from './user-login-refresh'
import { userLogout } from './user-logout'
import { userNewPassword } from './user-new-password'
import { userRegistration } from './user-registration'
import { userResendActivationLink } from './user-resend-activation-link'
import { userRestore } from './user-restore'
import { userUpdatePassword } from './user-update-password'
import { KZEN_ROUTE_ENUM } from '../services/enums'

export const useKzenRoutes = (app: Express) => {
    /* routes */
    userRegistration(app)

    userResendActivationLink(app)

    userActivation(app)

    userLogin(app)

    userLoginRefresh(app)

    kzenLoginGoogle(app)

    userRestore(app)

    userNewPassword(app)

    userUpdatePassword(app)

    userLogout(app)

    userGetInformation(app)

    // kzen upload/remove profile image
    kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.PROFILE_IMAGE_UPLOAD, 'avatars')
    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.PROFILE_IMAGE_DELETE, 'avatars')

    // kzen upload/remove sprint image
    kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.SPRINT_IMAGE_UPLOAD, 'sprints')
    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.SPRINT_IMAGE_DELETE, 'sprints')

    // kzen upload/goal-slide image
    kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.GOAL_SLIDE_IMAGE_UPLOAD, 'goals-slides')
    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.GOAL_SLIDE_IMAGE_DELETE, 'goals-slides')

    kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.ACH_IMAGE_UPLOAD, 'achievements')
    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.ACH_IMAGE_DELETE, 'achievements')

    kZenUploadImageToServer(app, KZEN_ROUTE_ENUM.STORY_IMAGE_UPLOAD, 'stories')
    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.STORY_IMAGE_DELETE, 'stories')
    // kzen autoRitualizeGoal
    kZenAutoRitualizeGoal(app)

    kZenDeleteImageFromServer(app, KZEN_ROUTE_ENUM.IMAGE_DELETE)

    kZenDestroyData(app)
}
