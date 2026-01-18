import { FlashcardDeck } from "@/Types"
import { createContext, useContext } from "react"

interface DeckContextType {
  decks: FlashcardDeck[]
  onDelete: (id: number) => Promise<void>
}

export const DeckContext = createContext<DeckContextType | undefined>(undefined)

export function useScheduleContext() {
  const scheduleContext = useContext(DeckContext)!

  if (!scheduleContext) {
    throw new Error("useScheduleContext must be used with a Schedule Context")
  }

  return scheduleContext
}
