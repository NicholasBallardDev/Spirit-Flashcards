import type { FlashcardDeck } from "@/Types";

const API_URL = 'http://localhost:3000';

export async function getDecks() {
  const res = await fetch(`${API_URL}/decks`);
  return res.json();
}

export async function getDeck(id: number) {
  const res = await fetch(`${API_URL}/decks/${id}`);
  return res.json();
}

export async function createDeck(deck: { name: string; description?: string }) {
  const res = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });
  return res.json();
}

export async function updateDeck(id: number, deck: FlashcardDeck) {
    const res = await fetch(`${API_URL}/decks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deck),
  });
  return res.json();
}

export async function deleteDeck(id: number) {
    const res = await fetch(`${API_URL}/decks`);
    return res.json();
}

