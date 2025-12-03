"use client";
import type { FlashcardDeck } from "@/Types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { MoreButton } from "./MoreButton";

interface DeckCardProps {
  deck: FlashcardDeck; 
}

export function DeckCard({ deck }: DeckCardProps) {
  return (
    <Link
      className={cn(
        "flex justify-between px-6 py-10 min-w-24 border rounded-md cursor-pointer hover:bg-gray-50 transition"
      )}
      href={`/decks/${deck.id}/edit`}>
      <div>
        <h2 className="text-lg font-bold">{deck.name}</h2>
        {deck.description && (
          <p className="text-gray-600 mt-1">{deck.description}</p>
        )}
      </div>
      <MoreButton/>
    </Link>
  );
}
