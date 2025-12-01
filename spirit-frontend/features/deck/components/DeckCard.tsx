"use client";
import type { FlashcardDeck } from "@/Types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface DeckCardProps {
  deck: FlashcardDeck;
  onClick?: (id: number) => void; 
}

export function DeckCard({ deck, onClick }: DeckCardProps) {
  return (
    <Link
      className={cn(
        "px-6 py-10 min-w-24 border rounded-md cursor-pointer hover:bg-gray-50 transition"
      )}
      href={`/decks/${deck.id}/edit`}    >
      <h2 className="text-lg font-bold">{deck.name}</h2>
      {deck.description && (
        <p className="text-gray-600 mt-1">{deck.description}</p>
      )}
    </Link>
  );
}
