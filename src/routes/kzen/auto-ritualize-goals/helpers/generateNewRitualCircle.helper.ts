import { add } from 'date-fns'

export const generateNewRitualCircle = (
    new_ritual_interval: number,
    goal_created_at: Date,
    goal_finished_at: Date,
): { ritual_goal_created_at: Date; ritual_goal_finished_at: Date } => {
    const today = new Date(Date.now())

    let ritual_goal_created_at = today
    let ritual_goal_finished_at = today

    if (goal_finished_at && goal_created_at) {
        if (goal_finished_at <= today) {
            ritual_goal_created_at = today
            ritual_goal_finished_at = add(ritual_goal_created_at, { days: new_ritual_interval })
        } else {
            ritual_goal_created_at = goal_finished_at
            ritual_goal_finished_at = add(ritual_goal_created_at, { days: new_ritual_interval })
        }
    }

    return { ritual_goal_created_at, ritual_goal_finished_at }
}
