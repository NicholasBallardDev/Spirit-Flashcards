"use client";
import { useEffect, useState } from "react";
import { CardEdit } from "@/features/card/components/CardEdit";
import { AddCardButton } from "@/features/card/components/AddCardButton";
import type { Card } from "@/Types";
import { createCard, deleteCard, updateCard } from "@/server/services/card.service";
import { toast, Toaster } from "sonner"

interface DeckClientProps {
    initialCards: Card[];
    deckId: number;
}

export function DeckClient({ initialCards, deckId }: DeckClientProps) {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const [updatedCards, setUpdatedCards] = useState<Card[]>([]);
    const [tempId, setTempId] = useState(-1)
    const cardIsSaved = (id: number) => id > 0

    useEffect(() => {
        if (localStorage.getItem("showToast") === "true") {
            toast.success("Changes have been saved");
            localStorage.removeItem("showToast");
        }
    }, []);


    const addCard = () => {
        setUpdatedCards((prev) => [...prev, {id: tempId, question: "", answer: "", deckId: deckId}]);
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

    const triggerCardChanges = async () => {
        try {
            for (const card of cards) {
                card.question && card.answer ? await updateCard(card.id, card) : null; 
            }

            for (const card of updatedCards) {
                card.question && card.answer ? await createCard(card, deckId) : null; 
            }
        } catch (err) {
            console.error("Error saving cards:", err);
        }
        
        localStorage.setItem("showToast", "true");
        window.location.reload();
    };

    const updateEdit = (updated: Card) => {
        if (updated.id > 0) {
            setCards(prev => prev.map(card => card.id === updated.id ? updated : card));
        } else {
            setUpdatedCards(prev => prev.map(card => card.id === updated.id ? updated : card));
        }
    };



    return (
        <>
            <div className="flex flex-col w-full mb-4 gap-4">
                {cards.map((card, index) => (
                    <CardEdit key={card.id} card={card} cardNo={index+1} onDelete={deleteCardEdit} onChange={updateEdit}/>
                ))}
                {updatedCards.map((card, index) => {
                    const cardNo = cards.length + index + 1
                    return <CardEdit key={card.id} card={card} cardNo={cardNo} onDelete={deleteCardEdit} onChange={updateEdit}/>
                })}
            </div>
            <AddCardButton onClick={addCard} />
            <button
                className="px-6 py-3 w-full bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
                onClick={triggerCardChanges}
                >
                Save Changes
            </button>
            <Toaster richColors />
        </>
    );
}