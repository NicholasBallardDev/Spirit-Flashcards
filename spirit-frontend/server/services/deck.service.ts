import type { Card, FlashcardDeck } from "@/Types"

const API_URL = "http://localhost:3000"

export async function getDecks(): Promise<FlashcardDeck[]> {
  const res = await fetch(`${API_URL}/decks`)
  return res.json()
}

export async function getDeckDetails(id: number): Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}`)
  return res.json()
}

export async function getDeck(id: number): Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}/cards`)
  return res.json()
}

export async function getDueCards(id: number): Promise<Card[]> {
  const res = await fetch(`${API_URL}/decks/${id}/due`)
  return res.json()
}

export async function countDecks(): Promise<number> {
  const res = await fetch(`${API_URL}/decks/count`)
  return res.json()
}

export async function countDueFromDeck(id: number): Promise<number> {
  const res = await fetch(`${API_URL}/decks/${id}/due/count`)
  return res.json()
}

export async function createDeck(
  deck: Omit<FlashcardDeck, "id">,
): Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: deck.name, description: deck.description }),
  })
  return res.json()
}

export async function updateDeck(
  id: number,
  deck: FlashcardDeck,
): Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deck),
  })

  if (!res.ok) {
    throw new Error(`Failed to update deck ${id}`)
  }

  return res.json() as Promise<FlashcardDeck>
}

export async function deleteDeck(id: number): Promise<object> {
  const res = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Failed to update deck ${id}`)
  }

  return res.json()
}
