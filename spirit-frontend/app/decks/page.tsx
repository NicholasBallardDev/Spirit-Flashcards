import { getDecks } from "@/server/services/deck.service";
import { DeckCard } from "@/features/deck/components/DeckCard"

export default async function DecksPage() {
  const decks = await getDecks();

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
    <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
        ))}
    </div>
    </div>
  );
}