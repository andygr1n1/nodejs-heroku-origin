export interface IGoal {
    id: string
    created_at: Date
    finished_at: Date
    goal_ritual: IGoalRitual
}

export interface IGoalRitual {
    id: string
    created_at: Date
    finished_at: Date
    goal_ritual: {
        ritual_interval: number
    }
}

export type RitualGoalType = Pick<IGoal, 'id' | 'created_at' | 'finished_at'> & {
    goal_ritual: { ritual_interval: number; ritual_type: RITUAL_TYPE_ENUM }
}

export type UpdatedRitualGoalType = Omit<RitualGoalType, 'goal_ritual'>

export enum RITUAL_TYPE_ENUM {
    INTERVAL_IN_DAYS = 'interval_in_days',
    DAYS_OF_WEEK = 'days_of_week',
}
