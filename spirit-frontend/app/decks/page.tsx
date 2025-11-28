import { getDecks } from "@/server/services/deck.service"; // your helper
import { DeckCard } from "@/features/deck/components/DeckCard"

export default async function DecksPage() {
  const decks = await getDecks();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Decks</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}
