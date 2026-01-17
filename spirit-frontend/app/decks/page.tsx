import { getDecks } from "@/server/services/deck.service"
import DeckClient from "./DeckClient"

export default async function DecksPage() {
  const decks = await getDecks()

  return <DeckClient decks={decks} />
}
