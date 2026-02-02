import { createContext, useContext, ReactNode } from "react"

interface DeckContextType {
  onDelete: (id: number) => Promise<void>
}

export const DeckContext = createContext<DeckContextType | undefined>(undefined)

export function useDeckContext() {
  const context = useContext(DeckContext)

  if (!context) {
    throw new Error("useDeckContext must be used within a DeckProvider")
  }

  return context
}

export function DeckProvider({
  children,
  onDelete,
}: DeckContextType & { children: ReactNode }) {
  return (
    <DeckContext.Provider value={{ onDelete }}>{children}</DeckContext.Provider>
  )
}
