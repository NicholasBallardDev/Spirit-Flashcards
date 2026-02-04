import { render, screen } from "@testing-library/react"
import { EditClient } from "@/app/decks/[id]/edit/EditClient"
import type { Card } from "@/Types"

describe(EditClient, () => {
  const deckId = 1
  it("client displays correct initial cards", () => {
    const cards = Array.from({ length: 800 }, (_, i) => ({
      id: i,
      question: `Question ${i}`,
      answer: `Answer ${i}`,
      deckId: deckId,
    })) as Card[]
    render(<EditClient deckId={0} initialCards={cards} />)
    expect(screen.queryByDisplayValue("Question -1")).not.toBeInTheDocument()
    expect(screen.getByDisplayValue("Question 0")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Question 400")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Question 798")).toBeInTheDocument()
    expect(screen.getByDisplayValue("Question 799")).toBeInTheDocument()
    expect(screen.queryByDisplayValue("Question 800")).not.toBeInTheDocument()
  })
})
