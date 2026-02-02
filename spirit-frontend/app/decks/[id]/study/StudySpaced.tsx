"use client"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { ScheduleContextProvider } from "@/features/card/context/ScheduleContextProvider"
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray"
import { getDeck, getDueCards } from "@/server/services/deck.service"
import { updateSchedule } from "@/server/services/schedule.service"
import { Card, FlashcardDeck } from "@/Types"
import { useEffect, useState } from "react"
import { Rating } from "ts-fsrs"

interface StudySpacedProps {
  deck: FlashcardDeck
}

export function StudySpaced({ deck }: StudySpacedProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [current, setCurrent] = useState(0)
  const [isLoading, setLoading] = useState(false)

  function isDue(c: Card): boolean {
    const dueDate = new Date(c.schedule.due).getTime()
    const oneHour = Date.now() + 1000 * 60 * 60
    return dueDate < oneHour
  }

  useEffect(() => {
    async function fetchCards() {
      setLoading(true)
      const dueCards = await getDueCards(deck.id)
      setCards(dueCards)
      setCurrent(0)
      setLoading(false)
    }
    fetchCards()
  }, [deck.id])

  async function onRate(rating: Rating) {
    const card = cards[current]
    await updateSchedule(card.schedule.id, rating)
    const updated = await getDeck(deck.id)
    const dueCards = updated.cards.filter((c) => isDue(c))
    const index = dueCards.findIndex((c) => c.id === card.id)
    if (index !== -1) dueCards.push(dueCards.splice(index, 1)[0])
    setCards(dueCards)
  }

  return (
    <>
      {isLoading ? (
        <></>
      ) : cards.length === 0 ? (
        <div className="flex justify-center items-center h-[75vh] text-2xl font-bold">
          No more cards left
        </div>
      ) : (
        <div className="flex-col justify-center items-center h-[70vh]">
          <CardStudyView key={current} card={cards[current]} />

          <div>
            <ScheduleContextProvider
              schedule={cards[current].schedule}
              onRate={onRate}
            >
              <RatingButtonTray />
            </ScheduleContextProvider>
          </div>
        </div>
      )}
    </>
  )
}
