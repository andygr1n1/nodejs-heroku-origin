import { Zerr } from '@/middleware'

import { ownerEmailTransporter } from './ownerEmailTransporter'

export const sendSuperUserEmail = async ({
    superUserEmails,
    emails,
    bookingId,
}: {
    superUserEmails: string[]
    emails: string[]
    bookingId: string
}) => {
    try {
        await ownerEmailTransporter({ emails, bookingId, superUserEmails })
    } catch (e) {
        throw Zerr({ message: `Server error${e}`, status: 422, path: ['sendSuperUserEmail'] })
    }
}
