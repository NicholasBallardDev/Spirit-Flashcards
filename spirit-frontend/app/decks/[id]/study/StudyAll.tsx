"use client"
import { CardNavigationTray } from "@/features/card/components/CardNavigationTray"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray"
import { FlashcardDeck } from "@/Types"
import { useEffect, useState } from "react"

interface StudyAll {
  deck: FlashcardDeck
}

export function StudyAll({ deck }: StudyAll) {
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

  function decrementCurrent() {
    current > 0 ? setCurrent(current - 1) : null
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
        <>
          <div className="flex-col justify-center items-center h-[50vh]">
            <CardStudyView key={current} question={question} answer={answer} />
            <div className="mt-6"></div>
          </div>
          <CardNavigationTray
            onDecrement={decrementCurrent}
            onIncrement={incrementCurrent}
          />
        </>
      )}
    </>
  )
}
