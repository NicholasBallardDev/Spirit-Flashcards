import { Card } from "./card";

export interface FlashcardDeck{
    id: number;
    name: string;
    cards: Card[];
    description?: string;
}