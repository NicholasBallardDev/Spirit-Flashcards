"use client"

import { useState } from "react"
import { FlashcardDeck } from "@/Types"
import { DeckEdit } from "./DeckEdit"
import { EditDeckDialogue } from "./EditDeckDialogue"

interface DeckHeaderProps {
  deck: FlashcardDeck
}

export function DeckHeader({ deck }: DeckHeaderProps) {
  const [name, setName] = useState(deck.name)
  const [description, setDescription] = useState(deck.description ?? "")

  const handleUpdate = (newName: string, newDescription: string) => {
    setName(newName)
    setDescription(newDescription)
  }

  return (
    <EditDeckDialogue
      deck={deck}
      initialName={name}
      initialDescription={description}
      onUpdate={handleUpdate}
      trigger={
        <div className="cursor-pointer">
          <DeckEdit title={name} description={description} />
        </div>
      }
    />
  )
}
