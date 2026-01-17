"use client"
import { getDecks } from "@/server/services/deck.service"
import { useEffect, useState } from "react"
import { FlashcardDeck } from "@/Types"
import { SearchBar } from "@/features/universal/components/Searchbar"
import DeckGridDisplay from "@/features/deck/components/DeckGridDisplay"
import CreateDeckButton from "@/features/deck/components/CreateDeckButton"

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
        <CreateDeckButton />
      </div>
      <DeckGridDisplay decks={decks} />
    </div>
  )
}
