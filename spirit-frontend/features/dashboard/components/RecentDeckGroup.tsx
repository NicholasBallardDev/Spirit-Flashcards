import { DeckCard } from "@/features/deck/components/DeckCard"
import { getDecks } from "@/server/services/deck.service"
import DeckCreationPrompt from "./DeckCreationPrompt"
export default async function RecentDeckGroup() {
  const deckPreviewNum = 3
  const decks = (await getDecks()).slice(-deckPreviewNum) // get last 3 most recent decks
  // const decks: any[] = [] // Temporary: Force empty state for testing
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-full max-w-6xl px-6">
        <h1 className="ml-2 mb-6 font-bold text-2xl">Recent Decks</h1>
        {decks.length > 0 && (
          <div className="flex flex-col gap-2">
            {decks.map((deck) => {
              return <DeckCard key={deck.id} deck={deck} showOptions={false} />
            })}
          </div>
        )}
        {decks.length === 0 && <DeckCreationPrompt />}
      </div>
    </div>
  )
}
