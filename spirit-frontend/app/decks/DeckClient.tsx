"use client"

import CreateDeckButton from "@/features/deck/components/CreateDeckButton"
import DeckGridDisplay from "@/features/deck/components/DeckGridDisplay"
import { DeckProvider } from "@/features/deck/context/deckContext"
import { SearchBar } from "@/features/universal/components/Searchbar"
import { getDecks } from "@/server/services/deck.service"
import { FlashcardDeck } from "@/Types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface DeckClientProps {
  decks: FlashcardDeck[]
}

export default function DeckClient({ decks }: DeckClientProps) {
  const [deckList, setDecks] = useState(decks)
  const [searchPrompt, setSearchPrompt] = useState("")
  const router = useRouter()

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentSearch = event.target.value
    setSearchPrompt(currentSearch)
    setDecks(
      decks.filter((deck) =>
        deck.name.toLowerCase().includes(currentSearch.toLowerCase()),
      ),
    )
  }

  async function onDelete() {
    const decks = await getDecks()
    setDecks(decks)
    router.refresh()
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
      <div className="flex gap-2 mb-4 w-full lg:w-[30%] lg:ml-auto">
        <SearchBar value={searchPrompt} onChange={handleSearchChange} />
        <CreateDeckButton />
      </div>
      <DeckProvider onDelete={onDelete}>
        <DeckGridDisplay decks={deckList} />
      </DeckProvider>
    </div>
  )
}
