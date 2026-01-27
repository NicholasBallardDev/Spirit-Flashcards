import { Image } from "./image"
import { Schedule } from "./schedule"

export interface Card {
  id: number
  question: string
  answer: string
  deckId: number
  questionImage: Image | null
  answerImage: Image | null
  schedule: Schedule
}
