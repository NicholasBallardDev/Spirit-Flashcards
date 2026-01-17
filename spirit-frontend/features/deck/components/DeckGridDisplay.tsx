import { FlashcardDeck } from "@/Types"
import { DeckCard } from "./DeckCard"

interface DeckGridProps {
  decks: FlashcardDeck[]
}

export default function DeckGridDisplay({ decks }: DeckGridProps) {
  return (
    <div
      className="
          grid gap-4 justify-center
          grid-cols-1        /* mobile: 1 per row */
          sm:grid-cols-2     /* small screens: max 2 per row */
          md:grid-cols-2     /* medium screens: max 2 per row */
          lg:grid-cols-3     /* large screens: max 3 per row */
        "
    >
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  )
}
