import { initGraphQLTada } from 'gql.tada'

import type { introspection } from '../graphql-env.d.ts'
export const graphql = initGraphQLTada<{
    introspection: introspection
    scalars: {
        uuid: string
        bigint: number
        smallint: number
        jsonb: never
        date: string
        timestamptz: string
        updated_at: string | null
    }
}>()
