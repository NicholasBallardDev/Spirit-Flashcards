"use client";
import { useState } from "react";
import { CardEdit } from "@/features/card/components/CardEdit";
import { AddCardButton } from "@/features/card/components/AddCardButton";
import type { Card } from "@/Types";

interface DeckClientProps {
    initialCards: Card[];
}

export function DeckClient({ initialCards }: DeckClientProps) {
    const cards = initialCards;
    const [newCardCount, setNewCardCount] = useState(0);

    const handleAddCard = () => {
        setNewCardCount(newCardCount + 1);
    };

    return (
        <>
            <div className="flex flex-col w-full mb-4 gap-4">
                {cards.map((card) => (
                    <CardEdit key={card.id} card={card} />
                ))}
                {Array.from({ length: newCardCount }).map((_, index) => (
                    <CardEdit 
                        key={`new-${index}`}
                    />
                ))}
            </div>
            <AddCardButton onClick={handleAddCard} />
        </>
    );
}