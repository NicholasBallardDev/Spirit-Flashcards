import { getDeck, getCards } from "@/server/services/deck.service";
import { CardEdit } from "@/features/card/components/CardEdit";

export default async function DeckPage({ params }: {
    params: Promise<{id: string}>
}) {
    const deckId = parseInt((await params).id);
    const deck = await getCards(deckId);
    const cards = deck.cards;
    console.log(deck.cards);
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{deck.name}</h1>
        <p className="text-gray-600 mb-6">{deck.description}</p>

        <h2 className="text-xl font-semibold mb-2">Cards</h2>
        <div className="flex justify-center w-full">
        {cards.map((card) => (
            <CardEdit key={card.id} card={card} />
        ))} 
        </div>
        <div className="space-y-4">
        </div>
    </div>
    );
}
