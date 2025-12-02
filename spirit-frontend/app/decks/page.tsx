import { getDecks } from "@/server/services/deck.service";
import { DeckCard } from "@/features/deck/components/DeckCard"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function DecksPage() {
  const decks = await getDecks();

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
    <div className="flex justify-end  mb-4">
      <Button className="bg-blue-600 hover:bg-blue-500">Create Deck<Plus></Plus></Button>
    </div>
    <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
        ))}
    </div>
    </div>
  );
}