import type { Card, FlashcardDeck } from "@/Types";

const API_URL = 'http://localhost:3000';

export async function getDecks():  Promise<FlashcardDeck[]> {
  const res = await fetch(`${API_URL}/decks`);
  return res.json();
}

export async function getDeck(id: number):  Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}`);
  return res.json();
}

export async function getCards(id: number):  Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}/cards`);
  return res.json();
}

export async function createDeck(deck: Omit<FlashcardDeck, "id">):  Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });
  return res.json();
}

export async function updateDeck(id: number, deck: FlashcardDeck):  Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/decks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });

  if (!res.ok){
    throw new Error(`Failed to update deck ${id}`);
  }

  return res.json() as Promise<FlashcardDeck>;
}

export async function deleteDeck(id: number):  Promise<Object> {
  const res = await fetch(`${API_URL}/decks/${id}`,{
    method: 'DELETE',
  });

  if (!res.ok){
    throw new Error(`Failed to update deck ${id}`);
  }

  return res.json();
}

