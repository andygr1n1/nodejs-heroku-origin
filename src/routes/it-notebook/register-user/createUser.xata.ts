import { getXataClient, User } from '../../../xata.js'

export const createUser = async ({ name, email, password }: User): Promise<User> => {
    try {
        const xata = getXataClient()

        const record = await xata.db.user.create({
            name,
            email,
            password,
        })
        return record
    } catch (e) {
        return e as User
    }
}
