import type { IKzenUser } from '@/apps/kzen/services/types'
import bcrypt from 'bcryptjs'

import type { ILoginSchema } from './types'
import { query_userDataByEmail } from '../../../services/graphql-service/query_userDataByEmail'

export const validateUserCredentials = async (props: ILoginSchema): Promise<IKzenUser | undefined> => {
    const { email, password } = props
    const user = await query_userDataByEmail(email)

    if (!user) return

    const valid = bcrypt.compareSync(password, user?.password)

    return valid ? user : undefined
}
