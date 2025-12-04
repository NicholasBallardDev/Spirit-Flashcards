"use client";
import { getDecks } from "@/server/services/deck.service";
import { DeckCard } from "@/features/deck/components/DeckCard"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateDeckDialog } from "@/features/deck/components/CreateDeckDialogue";
import { useEffect, useState } from "react";
import { FlashcardDeck } from "@/Types";

export default function DecksPage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([]) 

  useEffect(() => {
    const fetchData = async () => {
      const deckData = await getDecks()
      setDecks(deckData);
    }

    fetchData();
  })

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
    <div className="flex justify-end  mb-4">
      <CreateDeckDialog trigger={
        <Button className="bg-blue-600 hover:bg-blue-500">
          Create Deck<Plus/>
        </Button>}>
      </CreateDeckDialog>
      
    </div>
    <div className="
          grid gap-4 justify-center
          grid-cols-1        /* mobile: 1 per row */
          sm:grid-cols-2     /* small screens: max 2 per row */
          md:grid-cols-2     /* medium screens: max 2 per row */
          lg:grid-cols-3     /* large screens: max 3 per row */
        ">
        {decks.map((deck) => (
            <DeckCard key={deck.id} deck={deck} />
        ))}
    </div>
    </div>
  );
}