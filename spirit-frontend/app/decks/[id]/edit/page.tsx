import { getDeck } from "@/server/services/deck.service";
import { DeckClient } from "./DeckClient";

export default async function DeckPage({ params }: {
    params: Promise<{id: string}>
}) {
    const deckId = parseInt((await params).id);
    const deck = await getDeck(deckId);
    
    return (
        <div className="p-6">
            <div>
                <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
                <p className="text-gray-600 mb-6">{deck.description}</p>
            </div>
            <h2 className="text-xl font-semibold mb-2">Cards</h2>
            <DeckClient initialCards={deck.cards} deckId={deckId} />
        </div>
    );
}