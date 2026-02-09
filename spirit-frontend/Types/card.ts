import { CardImage } from "./CardImage"
import { Schedule } from "./schedule"

export interface Card {
  id: number
  question: string
  answer: string
  deckId: number
  questionImage: CardImage | null
  answerImage: CardImage | null
  schedule: Schedule
}
