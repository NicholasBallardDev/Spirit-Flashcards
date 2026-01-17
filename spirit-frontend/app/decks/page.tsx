"use client"
import { getDecks } from "@/server/services/deck.service"
import { DeckCard } from "@/features/deck/components/DeckCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateDeckDialog } from "@/features/deck/components/CreateDeckDialogue"
import { useEffect, useState } from "react"
import { FlashcardDeck } from "@/Types"
import { SearchBar } from "@/features/universal/components/Searchbar"
import DeckGridDisplay from "@/features/deck/components/DeckGridDisplay"

export default function DecksPage() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([])
  const [searchPrompt, setSearchPrompt] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const deckData = await getDecks()
      setDecks(deckData)
    }

    fetchData()
  })

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchPrompt(event.target.value)
    setDecks(decks.filter((deck) => deck.name.includes(searchPrompt)))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
      <div className="flex gap-2 mb-4 w-[30%] ml-auto">
        <SearchBar value={searchPrompt} onChange={handleSearchChange} />
        <CreateDeckDialog
          trigger={
            <Button className="bg-blue-600 hover:bg-blue-500">
              Create Deck
              <Plus />
            </Button>
          }
        ></CreateDeckDialog>
      </div>
      <DeckGridDisplay decks={decks} />
    </div>
  )
}
