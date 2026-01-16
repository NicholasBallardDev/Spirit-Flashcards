"use client"
import { useState } from "react"
import { CardEdit } from "@/features/card/components/CardEdit"
import { AddCardButton } from "@/features/card/components/AddCardButton"
import type { Card } from "@/Types"
import {
  createCard,
  deleteCard,
  updateCard,
} from "@/server/services/card.service"
import { toast, Toaster } from "sonner"
import { getDeck } from "@/server/services/deck.service"

interface DeckClientProps {
  initialCards: Card[]
  deckId: number
}

export function DeckClient({ initialCards, deckId }: DeckClientProps) {
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [newCards, setNewCards] = useState<Card[]>([])
  const [tempId, setTempId] = useState(-1)
  const cardIsSaved = (id: number) => id > 0

  //Add blank card in the UI
  const addCard = () => {
    setNewCards((prev) => [
      ...prev,
      { id: tempId, question: "", answer: "", deckId: deckId } as Card,
    ])
    setTempId(tempId - 1)
  }

  //Deletes card edit component from the ui
  const deleteCardEdit = (id: number) => {
    if (cardIsSaved(id)) {
      setCards((prev) => prev.filter((card) => card.id !== id))
      deleteCard(id)
    } else {
      setNewCards((prev) => prev.filter((card) => card.id !== id))
    }
  }

  //Adds cards to the backend
  const triggerCardChanges = async () => {
    try {
      //TODO: Use promise.all instead of for loops
      //Updates card if it already existed
      for (const card of cards) {
        card.question && card.answer ? await updateCard(card.id, card) : null
      }
      //creates new card if its new
      for (const card of newCards) {
        card.question && card.answer ? await createCard(card, deckId) : null
      }
    } catch (err) {
      console.error("Error saving cards:", err)
    }
    //retrieving deck from the backend so we dont accidentally add blank cards
    const deckData = await getDeck(deckId)
    setCards(deckData.cards)
    setNewCards([])

    toast.success("Changes have been saved")
  }

  const updateEdit = (updated: Card) => {
    if (updated.id > 0) {
      setCards((prev) =>
        prev.map((card) => (card.id === updated.id ? updated : card))
      )
    } else {
      setNewCards((prev) =>
        prev.map((card) => (card.id === updated.id ? updated : card))
      )
    }
  }

  return (
    <>
      <div className="flex flex-col w-full mb-4 gap-4">
        {cards.map((card, index) => (
          <CardEdit
            key={card.id}
            card={card}
            cardNo={index + 1}
            onDelete={deleteCardEdit}
            onChange={updateEdit}
          />
        ))}
        {newCards.map((card, index) => {
          const cardNo = cards.length + index + 1
          return (
            <CardEdit
              key={card.id}
              card={card}
              cardNo={cardNo}
              onDelete={deleteCardEdit}
              onChange={updateEdit}
            />
          )
        })}
      </div>
      <AddCardButton onClick={addCard} />
      <button
        className="px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
        onClick={triggerCardChanges}
      >
        Save Changes
      </button>
      <Toaster richColors />
    </>
  )
}
