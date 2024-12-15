import { Zerr } from '@/middleware'

import { guestEmailTransporter } from './guestEmailTransporter'

export const sendInformationEmail = async ({
    emails,
    bookingId,
    language,
}: {
    emails: string[]
    bookingId: string
    language: string
}) => {
    try {
        await guestEmailTransporter({ emails, bookingId, language })
    } catch (e) {
        throw Zerr({ message: `Server error${e}`, status: 422, path: ['sendInformationEmail'] })
    }
}
