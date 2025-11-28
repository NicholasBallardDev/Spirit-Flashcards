"use client";
import type { FlashcardDeck } from "@/Types";
import { cn } from "@/lib/utils";

interface DeckCardProps {
  deck: FlashcardDeck;
  onClick?: (id: number) => void; 
}

export function DeckCard({ deck, onClick }: DeckCardProps) {
  return (
    <div
      className={cn(
        "px-6 py-10 min-w-24 border rounded-md cursor-pointer hover:bg-gray-50 transition"
      )}
      onClick={() => onClick?.(deck.id)}
    >
      <h2 className="text-lg font-bold">{deck.name}</h2>
      {deck.description && (
        <p className="text-gray-600 mt-1">{deck.description}</p>
      )}
    </div>
  );
}
