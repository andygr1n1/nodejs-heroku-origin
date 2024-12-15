import { query_userDataByEmail } from '@/apps/kzen/services/graphql-service'
import type { IKzenUser } from '@/apps/kzen/services/types'
import { kzenGuestSchema } from '@/apps/kzen/services/types'
import type { Request } from 'express'

export const getUserInformation = async (req: Request): Promise<Partial<IKzenUser> | undefined> => {
    const userFormData = kzenGuestSchema.parse(req.body)

    const user = await query_userDataByEmail(userFormData.email)

    return user
}
