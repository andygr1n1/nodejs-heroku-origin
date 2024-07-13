import { query_userDataByEmail } from '@/apps/kzen/services/graphql-service'
import { mutation_InsertHeroUser } from '@/apps/kzen/services/graphql-service/mutation_InsertHeroUser'
import { UserRole, type IKzenUser } from '@/apps/kzen/services/types'
import bcrypt from 'bcryptjs'

import { generateNewPassword } from '../helpers/generateNewPassword'

export const generateGoogleUser = async (email: string): Promise<IKzenUser | undefined> => {
    let user = await query_userDataByEmail(email)
    if (!user) {
        user = await mutation_InsertHeroUser({
            name: email,
            email,
            password: bcrypt.hashSync(generateNewPassword(), 10),
            role: UserRole.hero,
        })
    }

    return user
}
