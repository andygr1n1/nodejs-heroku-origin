import { GraphQLClient } from 'graphql-request'

export const generateClient = (): GraphQLClient | undefined => {
    try {
        const endpoint = process.env.VITE_CLIENT_ENDPOINT
        const secret = process.env.VITE_X_HASURA_ADMIN_SECRET
        if (!endpoint || !secret) throw new Error('graphql-request: generateClient error - env errors')
        const client = new GraphQLClient(endpoint, {
            headers: { 'x-hasura-admin-secret': secret },
        })

        return client
    } catch (e) {
        console.error(e)
    }
}
