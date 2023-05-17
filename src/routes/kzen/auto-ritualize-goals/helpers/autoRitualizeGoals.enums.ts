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
    goal_ritual: { ritual_interval: number }
}

export type UpdatedRitualGoalType = Omit<RitualGoalType, 'goal_ritual'>
