import { getDeck } from "@/server/services/deck.service"
import { DeckClient } from "./DeckClient"
import { DeckEdit } from "@/features/deck/components/DeckEdit"

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const deckId = parseInt((await params).id)
  const deck = await getDeck(deckId)

  return (
    <div className="p-6">
      <div>
        <DeckEdit title={deck.name} description={deck.description} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Cards</h2>
      <DeckClient initialCards={deck.cards} deckId={deckId} />
    </div>
  )
}
