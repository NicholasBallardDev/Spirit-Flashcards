import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DeckDropdownProps {
  trigger: React.ReactNode
}

export function DeckDropdown({ trigger: child }: DeckDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {child}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Deck</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    Edit Deck
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Delete Deck
                </DropdownMenuItem>
            </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
