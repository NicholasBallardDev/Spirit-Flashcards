import { getDeck } from "@/server/services/deck.service"
import { EditClient } from "./EditClient"
import { DeckHeader } from "@/features/deck/components/DeckHeader"

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
        <DeckHeader deck={deck} />
      </div>
      <h2 className="text-xl font-semibold mb-2">Cards</h2>
      <EditClient initialCards={deck.cards} deckId={deckId} />
    </div>
  )
}
