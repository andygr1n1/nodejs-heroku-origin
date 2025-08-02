import jwt from 'jsonwebtoken'

import { graphql } from '@/graphql/tada'
import { Zerr } from '@/middleware'
import { generateClient } from '@/services/graphql-service'

import type { IIdentitySchema, IParseJwtSchema, IValidateIdentityResponseSchema } from './types'

export const validateIdentity = async ({
    registrationId,
    bookingId,
    requestSessionJWT,
}: {
    registrationId?: string
    bookingId?: string
    requestSessionJWT?: string
}): Promise<IIdentitySchema | undefined> => {
    try {
        const registrationIdQuery = graphql(`
            query registrationIdQuery($registrationId: uuid) {
                wedding_groups(where: { id: { _eq: $registrationId } }) {
                    id
                    booking_number
                    registration
                }
            }
        `)

        const bookingIdQuery = graphql(`
            query bookingIdQuery($bookingId: String) {
                wedding_groups(where: { booking_number: { _eq: $bookingId } }) {
                    id
                    booking_number
                    registration
                }
            }
        `)

        const client = generateClient()
        if (!client) throw Zerr({ message: 'Generate client error', status: 422, path: ['validateIdentity'] })

        let regId = registrationId

        if (requestSessionJWT) {
            const refreshSecret = process.env.JWT_REFRESH_SECRET

            if (!requestSessionJWT || !refreshSecret) {
                throw Zerr({ message: 'unauthorized', status: 422, path: ['validateIdentity'] })
            }

            const parsed = jwt.decode(requestSessionJWT) as IParseJwtSchema
            regId = parsed?.id
        }

        const response = regId
            ? await client.request<IValidateIdentityResponseSchema>(registrationIdQuery, { registrationId: regId })
            : await client.request<IValidateIdentityResponseSchema>(bookingIdQuery, { bookingId })

        return {
            id: response?.wedding_groups[0]?.id,
            booking_number: response?.wedding_groups[0]?.booking_number,
            registration: response?.wedding_groups[0]?.registration,
        }
    } catch (e) {
        throw Zerr({ message: `Server error: ${e}`, status: 422, path: ['validateIdentity'] })
    }
}
