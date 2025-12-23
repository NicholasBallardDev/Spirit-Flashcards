"use client"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { ScheduleContext } from "@/features/card/components/context"
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray"
import { updateSchedule } from "@/server/services/schedule.service"
import { FlashcardDeck } from "@/Types"
import { useEffect, useState } from "react"
import { Rating } from "ts-fsrs"

interface StudyClientProps {
  deck: FlashcardDeck
}

export function StudyClient({ deck }: StudyClientProps) {
  const cards = deck.cards
  const [current, setCurrent] = useState(0)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  function setFlashcard(question: string, answer: string) {
    setQuestion(question)
    setAnswer(answer)
  }

  function incrementCurrent() {
    setCurrent(current + 1)
  }

  function onRate(rating: Rating) {
    const schedule = cards[current].schedule
    updateSchedule(schedule.id, rating)
    incrementCurrent()
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
