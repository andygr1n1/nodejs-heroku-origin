import type { Express } from 'express'
import { KZEN_ROUTE_ENUM } from '../KZenRoute.enum.js'
import { fetchExpiredRitualsQuery } from './helpers/fetchExpiredRituals.query.js'
import { generateNewRitualCircle } from './helpers/generateNewRitualCircle.helper.js'
import { updateRitualGoal } from './helpers/updateRitualGoals.mutation.js'

export const kZenAutoRitualizeGoal = (app: Express) => {
    app.post(KZEN_ROUTE_ENUM.AUTO_RITUALIZE_GOALS, async function (req, res) {
        try {
            updateExpiredRituals()
            return res.status(200).send('success')
        } catch (e) {
            console.error(e)
            return res.status(500).send(e)
        }
    })
}

export async function updateExpiredRituals() {
    const expiredRitualGoals = await fetchExpiredRitualsQuery()
    console.log('expiredRitualGoals', expiredRitualGoals)

    expiredRitualGoals?.forEach((goal) => {
        const { ritual_goal_created_at, ritual_goal_finished_at } = generateNewRitualCircle(
            goal.goal_ritual.ritual_interval,
            new Date(goal.created_at),
            new Date(goal.finished_at),
        )

        const goalToUpdate = { id: goal.id, created_at: ritual_goal_created_at, finished_at: ritual_goal_finished_at }
        updateRitualGoal(goalToUpdate)
    })
}
