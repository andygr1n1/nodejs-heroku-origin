import { GraphQLClient } from 'graphql-request'

import type { Request } from 'express'

// Utility function to detect localhost from request
export const isLocalhostRequest = (req: Request | null | undefined): boolean => {
    if (!req) return false

    // Check various ways the request might indicate localhost
    const hostname = req.hostname || req.get('host')?.split(':')[0] || ''
    const origin = req.get('origin') || ''
    const referer = req.get('referer') || ''

    // Check hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1') {
        return true
    }

    // Check origin header
    try {
        const url = new URL(origin)
        if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1') {
            return true
        }
    } catch {}

    // Check referer header
    try {
        const url = new URL(referer)
        if (url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1') {
            return true
        }
    } catch {}

    return false
}

// Enhanced client generation with localhost context
export const generateClientWithContext = (req?: Request | null): GraphQLClient | undefined => {
    const isLocalhost = isLocalhostRequest(req)
    let endpoint: string | undefined
    let secret: string | undefined

    try {
        if (isLocalhost) {
            // Use dev client for localhost requests
            endpoint = process.env.VITE_DEV_CLIENT_ENDPOINT
            secret = process.env.VITE_DEV_X_HASURA_ADMIN_SECRET
            console.log('localhost request - using dev client', endpoint)
        } else {
            // Use production client for non-localhost requests
            endpoint = process.env.VITE_CLIENT_ENDPOINT
            secret = process.env.VITE_X_HASURA_ADMIN_SECRET
        }
        if (!endpoint || !secret) throw new Error('graphql-request: generateClient error - env errors')
        return new GraphQLClient(endpoint, {
            headers: { 'x-hasura-admin-secret': secret },
        })
    } catch (e) {
        console.error(e)
    }
}

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
