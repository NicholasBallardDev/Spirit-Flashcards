"use client";
import type { FlashcardDeck } from "@/Types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { MoreButton } from "./MoreButton";
import { DeckDropdown } from "./DeckDropdown";

interface DeckCardProps {
  deck: FlashcardDeck; 
}

export function DeckCard({ deck }: DeckCardProps) {
  return (
    <div className="relative">
      <Link href={`/decks/${deck.id}/edit`}
            className={cn(
               "flex justify-between px-6 py-10 min-w-24 border rounded-md cursor-pointer hover:bg-gray-50 transition")}>
        <div>
          <h2 className="text-lg font-bold">{deck.name}</h2>
          {deck.description && (
            <p className="text-gray-600 mt-1">{deck.description}</p>
          )}
        </div>
      </Link>
      <div className="absolute top-6 right-5">
        <DeckDropdown trigger={<button><MoreButton /></button>} />
      </div>
    </div>
  );
}
