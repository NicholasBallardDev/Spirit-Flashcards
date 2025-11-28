import type { Card, FlashcardDeck } from "@/Types";

const API_URL = 'http://localhost:3000';

export async function getCards():  Promise<Card[]> {
  const res = await fetch(`${API_URL}/cards`);
  return res.json();
}

export async function getCard(id: number):  Promise<Card> {
  const res = await fetch(`${API_URL}/cards/${id}`);
  return res.json();
}

export async function findDeck(deckId: number):  Promise<FlashcardDeck> {
  const res = await fetch(`${API_URL}/cards/deck/${deckId}`);
  return res.json();
}

export async function createCard(card: Card):  Promise<Card> {
  const res = await fetch(`${API_URL}/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  return res.json();
}

export async function updateCard(id: number, card: Card):  Promise<Card> {
  const res = await fetch(`${API_URL}/cards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });

  if (!res.ok){
    throw new Error(`Failed to update card ${id}`);
  }

  return res.json() as Promise<Card>;
}

export async function deleteCard(id: number):  Promise<Object> {
  const res = await fetch(`${API_URL}/cards/${id}`,{
    method: 'DELETE',
  });

  if (!res.ok){
    throw new Error(`Failed to update card ${id}`);
  }

  return res.json();
}

