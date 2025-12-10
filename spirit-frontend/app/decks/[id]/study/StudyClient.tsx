"use client";
import { CardStudyView } from "@/features/card/components/CardStudyView";
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray";
import { FlashcardDeck } from "@/Types";
import { useEffect, useState } from "react";

interface StudyClientProps {
    deck: FlashcardDeck
}

export function StudyClient({ deck }: StudyClientProps) {
    const cards = deck.cards
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    function setFlashcard(question: string, answer: string){
        setQuestion(question);
        setAnswer(answer);
    }

    useEffect(() => {
        if(cards.length === 0){
            setFlashcard("There Are No Cards In This Deck Yet", "There Are No Cards In This Deck Yet")
        } else{
            setFlashcard(cards[0].question, cards[0].answer)
        }
    })

    return (
        <div className="flex-col justify-center items-center h-[50vh]">
            <CardStudyView question={question} answer={answer}/>
            <div className="mt-6">
                <RatingButtonTray onRate={(rating) => {
                    console.log(`Rated: ${rating}`);
                    // handle scheduling, progress, next card, etc.
                }} />
            </div>
        </div>
    );
}