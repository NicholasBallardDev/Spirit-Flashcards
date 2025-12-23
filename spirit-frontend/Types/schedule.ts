export enum State {
  New = 0,
  Learning = 1,
  Review = 2,
  Relearning = 3,
}

export enum Rating {
  Again = 1,
  Hard = 2,
  Good = 3,
  Easy = 4,
}

export interface Schedule {
  id: number
  cardId: number
  due: string
  stability: number
  difficulty: number
  scheduled_days: number
  elapsed_days: number
  learning_steps: number
  reps: number
  lapses: number
  state: State
  last_review?: string
}
