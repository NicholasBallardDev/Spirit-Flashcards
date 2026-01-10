"use client"

import { updateDeck } from "@/server/services/deck.service"
import { toast, Toaster } from "sonner"
import { DeckFormDialog } from "./DeckFormDialogue"
import { FlashcardDeck } from "@/Types"

interface EditDeckProps {
  deck: FlashcardDeck
  trigger: React.ReactNode
  initialName?: string
  initialDescription?: string
  onUpdate?: (name: string, description: string) => void
}

export function EditDeckDialogue({
  deck,
  trigger,
  initialName = "",
  initialDescription = "",
  onUpdate,
}: EditDeckProps) {
  const handleSubmit = async (values: {
    name: string
    description: string
  }) => {
    await updateDeck(deck.id, {
      ...deck,
      name: values.name,
      description: values.description,
    })
    if (onUpdate) {
      onUpdate(values.name, values.description)
    }
    toast.success("Deck successfully updated")
  }

  return (
    <>
      <Toaster richColors />
      <DeckFormDialog
        trigger={trigger}
        title="Edit Deck"
        description="Update the name and description for your deck."
        defaultValues={{ name: initialName, description: initialDescription }}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
      />
    </>
  )
}
