import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteDeck } from "@/server/services/deck.service"
import Link from "next/link"
import { useDeckContext } from "../context/deckContext"

interface DeckDropdownProps {
  trigger: React.ReactNode
  deckId: number
}

export function DeckDropdown({ trigger: child, deckId }: DeckDropdownProps) {
  const { onDelete } = useDeckContext()

  const handleDelete = async () => {
    await deleteDeck(deckId)
    await onDelete(deckId)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{child}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/decks/${deckId}/edit`}>Edit Deck</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-500 font-semibold"
          >
            Delete Deck
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
