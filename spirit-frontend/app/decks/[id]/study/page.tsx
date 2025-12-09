import { CardStudyView } from "@/features/card/components/CardStudyView";
import { getDeck } from "@/server/services/deck.service";
import StudyClient from "./StudyClient";

export default async function StudyPage({ params }: {
    params: Promise<{id: string}>
}) {
    const deckId = parseInt((await params).id);
    const deck = await getDeck(deckId);
    return (
        <div className="flex justify-center">
            <div className="h-[50vh] w-1/2">
                <StudyClient question={""} answer={""} deck={deck}/>
            </div>
        </div>
    );
}