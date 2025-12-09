"use client";
import { CardStudyView } from "@/features/card/components/CardStudyView";
import { getDeck } from "@/server/services/deck.service";
import { Card, FlashcardDeck } from "@/Types";

interface StudyClientProps {
    question: String
    answer: String
    deck: FlashcardDeck
}

export default function StudyClient({question, answer, deck}: StudyClientProps) {
    return (
        <CardStudyView question="how much does a polar bear weigh?" answer="enough to break the ice"/>
    );
}