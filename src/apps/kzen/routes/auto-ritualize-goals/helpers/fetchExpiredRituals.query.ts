import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { RitualGoalType } from './autoRitualizeGoals.enums'

export const fetchExpiredRitualsQuery = async (): Promise<RitualGoalType[] | undefined> => {
    try {
        const client = generateClient()

        if (!client) throw new Error('generate client error')

        const query = gql`
            query Goals {
                goals(
                    where: {
                        goal_ritual: { ritual_power: { _neq: 0 } }
                        deleted_at: { _is_null: true }
                        finished_at: { _lte: "now()" }
                    }
                ) {
                    id
                    finished_at
                    created_at
                    goal_ritual {
                        ritual_interval
                        ritual_type
                    }
                }
            }
        `

        const response: { goals: RitualGoalType[] } = await client.request(query)

        return response?.goals
    } catch (e) {
        console.error('fetchExpiredRitualsQuery error:', e)
        return
    }
}
