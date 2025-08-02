import { GraphQLClient } from 'graphql-request'

export const generateClient = (): GraphQLClient | undefined => {
    try {
        const endpoint = process.env.VITE_CLIENT_ENDPOINT
        const secret = process.env.VITE_X_HASURA_ADMIN_SECRET
        console.log('endpoint and secret', endpoint, secret)
        if (!endpoint || !secret) throw new Error('graphql-request: generateClient error - env errors')
        const client = new GraphQLClient(endpoint, {
            headers: { 'x-hasura-admin-secret': secret },
        })

        return client
    } catch (e) {
        console.error(e)
    }
}

export const generateDevClient = (): GraphQLClient | undefined => {
    try {
        const endpoint = process.env.VITE_DEV_CLIENT_ENDPOINT
        const secret = process.env.VITE_DEV_X_HASURA_ADMIN_SECRET
        console.log('dev endpoint and secret', endpoint, secret)
        if (!endpoint || !secret) throw new Error('graphql-request: generateDevClient error - env errors')
        const client = new GraphQLClient(endpoint, {
            headers: { 'x-hasura-admin-secret': secret },
        })

        return client
    } catch (e) {
        console.error(e)
    }
}
