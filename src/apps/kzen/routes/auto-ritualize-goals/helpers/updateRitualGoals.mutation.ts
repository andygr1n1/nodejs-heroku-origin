import { generateClient } from '@/services/graphql-service'
import { gql } from 'graphql-request'

import type { UpdatedRitualGoalType } from './autoRitualizeGoals.enums'

export const updateRitualGoal = async (goal: UpdatedRitualGoalType) => {
    try {
        const client = generateClient()
        if (!client) throw new Error('generate client error')

        const mutation = gql`
            mutation updateRitualGoal($goal_id: uuid!, $created_at: timestamptz, $finished_at: timestamptz) {
                update_goals_by_pk(
                    pk_columns: { id: $goal_id }
                    _set: { created_at: $created_at, finished_at: $finished_at }
                ) {
                    status
                }
            }
        `

        const response = await client.request(mutation, {
            goal_id: goal.id,
            created_at: goal.created_at,
            finished_at: goal.finished_at,
        })

        return response
    } catch (e) {
        console.error('updateRitualGoal', e)
        return
    }
}
