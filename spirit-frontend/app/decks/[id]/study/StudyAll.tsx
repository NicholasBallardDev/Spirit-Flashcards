"use client"
import { CardNavigationTray } from "@/features/card/components/CardNavigationTray"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { FlashcardDeck } from "@/Types"
import { useState } from "react"

interface StudyAll {
  deck: FlashcardDeck
}

export function StudyAll({ deck }: StudyAll) {
  const cards = deck.cards

  const [current, setCurrent] = useState(0)

  function incrementCurrent() {
    setCurrent(current + 1)
  }

  function decrementCurrent() {
    current > 0 ? setCurrent(current - 1) : null
  }
  return (
    <>
      {current >= cards.length ? (
        <div className="flex justify-center items-center h-[75vh] text-2xl font-bold">
          No more cards left
        </div>
      ) : (
        <>
          <div className="flex-col justify-center items-center h-[70vh] mb-4">
            <CardStudyView key={current} card={cards[current]} />

            <CardNavigationTray
              onDecrement={decrementCurrent}
              onIncrement={incrementCurrent}
              current={current + 1}
              deckSize={deck.cards.length}
            />
          </div>
        </>
      )}
    </>
  )
}
