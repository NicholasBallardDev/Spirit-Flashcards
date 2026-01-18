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
  trigger: React.ReactNode
  deckId: number
  onDelete: () => void
}

export function DeckDropdown({
  trigger: child,
  deckId,
  onDelete,
}: DeckDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{child}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Deck</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/decks/${deckId}/edit`}>Edit Deck</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete}>Delete Deck</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
