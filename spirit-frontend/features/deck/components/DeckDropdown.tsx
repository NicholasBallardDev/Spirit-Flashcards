import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteDeck } from "@/server/services/deck.service"
import Link from "next/link"

interface DeckDropdownProps {
  trigger: React.ReactNode,
  deckId: number,
}

export function DeckDropdown({ trigger: child, deckId }: DeckDropdownProps) {

  async function removeDeck() {
    deleteDeck(deckId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {child}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Deck</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link href={`/decks/${deckId}/edit`}>
                    Edit Deck
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={removeDeck}>
                    Delete Deck
                </DropdownMenuItem>
            </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
