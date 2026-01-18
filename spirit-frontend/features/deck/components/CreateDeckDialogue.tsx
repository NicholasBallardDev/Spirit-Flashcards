"use client"

import { createDeck } from "@/server/services/deck.service"
import { toast, Toaster } from "sonner"
import { DeckFormDialog } from "./DeckFormDialogue"
import { useRouter } from "next/navigation"

interface CreateDeckDialogProps {
  trigger: React.ReactNode
}

export function CreateDeckDialog({ trigger }: CreateDeckDialogProps) {
  const router = useRouter()

  const handleSubmit = async (values: {
    name: string
    description: string
  }) => {
    const newDeck = await createDeck({
      name: values.name,
      description: values.description,
      cards: [],
    })
    toast.success("Deck successfully created")
    router.push(`/decks/${newDeck.id}/edit`)
  }

  return (
    <>
      <Toaster richColors />
      <DeckFormDialog
        trigger={trigger}
        title="Create a new deck"
        description="Enter a name and optional description for your deck."
        submitLabel="Create Deck"
        onSubmit={handleSubmit}
      />
    </>
  )
}
