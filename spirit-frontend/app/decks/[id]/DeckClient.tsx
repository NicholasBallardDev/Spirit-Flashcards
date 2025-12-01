"use client";
import { useState } from "react";
import { CardEdit } from "@/features/card/components/CardEdit";
import { AddCardButton } from "@/features/card/components/AddCardButton";
import type { Card } from "@/Types";
import { deleteCard } from "@/server/services/card.service";

interface DeckClientProps {
    initialCards: Card[];
}

export function DeckClient({ initialCards }: DeckClientProps) {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const [updatedCards, setUpdatedCards] = useState<Card[]>([]);
    const [tempId, setTempId] = useState(-1)
    const cardIsSaved = (id: number) => id > 0


    const addCard = () => {
        setUpdatedCards((prev) => [...prev, {id: tempId, question: "", answer: ""}]);
        setTempId(tempId - 1)
    };
    
    const deleteCardEdit = (id: number) => {
        if (cardIsSaved(id)){
            setCards(prev => prev.filter(card => card.id !== id))
            deleteCard(id)
        } else{
            setUpdatedCards(prev => prev.filter(card => card.id !== id))
        }
        
    };

    return (
        <>
            <div className="flex flex-col w-full mb-4 gap-4">
                {cards.map((card, index) => (
                    <CardEdit key={card.id} card={card} cardNo={index+1} onDelete={deleteCardEdit}/>
                ))}
                {updatedCards.map((card, index) => {
                    const cardNo = cards.length + index + 1
                    return <CardEdit key={card.id} card={card} cardNo={cardNo} onDelete={deleteCardEdit}/>
                })}
            </div>
            <AddCardButton onClick={addCard} />
            <button
                className="px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                >
                Save Changes
            </button>
        </>
    );
}