import { getXataClient, type User } from '../../../xata.js'

export const getUser = async ({ email, password }: User): Promise<User | null> => {
    try {
        const xata = getXataClient()

        const record = await xata.db.user
            .filter({
                email,
                password,
            })
            .getFirst()

        return record
    } catch (e) {
        return null
    }
}
