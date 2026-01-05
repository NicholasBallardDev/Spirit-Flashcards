"use client"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { ScheduleContext } from "@/features/card/components/context"
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray"
import { getDeck } from "@/server/services/deck.service"
import { updateSchedule } from "@/server/services/schedule.service"
import { FlashcardDeck } from "@/Types"
import { useEffect, useState } from "react"
import { Rating } from "ts-fsrs"

interface StudyClientProps {
  deck: FlashcardDeck
}

export function StudyClient({ deck }: StudyClientProps) {
  const [cards, setCards] = useState(() =>
    deck.cards.filter((c) => {
      const dueDate = new Date(c.schedule.due).getTime()
      const oneHour = Date.now() + 1000 * 60 * 60
      return dueDate < oneHour
    })
  )

  const [current, setCurrent] = useState(0)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  function setFlashcard(question: string, answer: string) {
    setQuestion(question)
    setAnswer(answer)
  }

  async function onRate(rating: Rating) {
    const card = cards[current]
    await updateSchedule(card.schedule.id, rating)
    const updated = await getDeck(deck.id)
    const dueCards = updated.cards.filter((c) => {
      const dueDate = new Date(c.schedule.due).getTime()
      const oneHour = Date.now() + 1000 * 60 * 60
      return dueDate < oneHour
    })
    const index = dueCards.findIndex((c) => c.id === card.id)
    if (index !== -1) dueCards.push(dueCards.splice(index, 1)[0])
    setCards(dueCards)
  }

  useEffect(() => {
    if (cards.length === 0) {
      setFlashcard(
        "There Are No Cards In This Deck Yet",
        "There Are No Cards In This Deck Yet"
      )
    } else if (current < cards.length) {
      setFlashcard(cards[current].question, cards[current].answer)
      console.log(cards[current])
    }
  }, [cards, current])

  return (
    <>
      {current >= cards.length ? (
        <div className="flex justify-center items-center h-[50vh] text-2xl font-bold">
          No more cards left
        </div>
      ) : (
        <div className="flex-col justify-center items-center h-[50vh]">
          <CardStudyView key={current} question={question} answer={answer} />
          <div className="mt-6">
            <ScheduleContext.Provider
              value={{ schedule: cards[current].schedule, onRate }}
            >
              <RatingButtonTray />
            </ScheduleContext.Provider>
          </div>
        </div>
      )}
    </>
  )
}
