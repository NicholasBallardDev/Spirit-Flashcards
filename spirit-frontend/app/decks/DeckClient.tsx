"use client"

import CreateDeckButton from "@/features/deck/components/CreateDeckButton"
import DeckGridDisplay from "@/features/deck/components/DeckGridDisplay"
import { SearchBar } from "@/features/universal/components/Searchbar"
import { FlashcardDeck } from "@/Types"
import { useState } from "react"

interface DeckClientProps {
  decks: FlashcardDeck[]
}

export default function DeckClient({ decks }: DeckClientProps) {
  const [deckList, setDecks] = useState(decks)
  const [searchPrompt, setSearchPrompt] = useState("")

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentSearch = event.target.value
    setSearchPrompt(currentSearch)
    setDecks(
      decks.filter((deck) =>
        deck.name.toLowerCase().includes(currentSearch.toLowerCase())
      )
    )
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Decks</h1>
      <div className="flex gap-2 mb-4 w-[30%] ml-auto">
        <SearchBar value={searchPrompt} onChange={handleSearchChange} />
        <CreateDeckButton />
      </div>
      <DeckGridDisplay decks={deckList} />
    </div>
  )
}
