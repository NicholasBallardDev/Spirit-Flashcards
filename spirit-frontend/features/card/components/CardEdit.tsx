"use client";
import { useEffect, useRef, useState } from "react";
import type { Card } from "@/Types";
import { cn } from "@/lib/utils";

interface CardProps {
  card: Card;
  onClick?: (id: number) => void;
}

export function CardEdit({ card, onClick }: CardProps) {
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = (elem: HTMLTextAreaElement | null) => {
    if (!elem) return;
    elem.style.height = "auto";
    elem.style.height = `${elem.scrollHeight}px`;
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    autoResize(e.target);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    autoResize(e.target);
  };

  useEffect(() => {
    const handleResize = () => {
      autoResize(questionRef.current);
      autoResize(answerRef.current);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [question, answer]);

  return (
    <div
      className={cn(
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer hover:bg-gray-50 transition flex gap-4 items-start"
      )}
      onClick={() => onClick?.(card.id)}
    >
      <textarea
        ref={questionRef}
        value={question}
        onChange={handleQuestionChange}
        className="w-1/2 border p-2 rounded resize-none overflow-hidden whitespace-pre-wrap"
        rows={1}
      />
      <textarea
        ref={answerRef}
        value={answer}
        onChange={handleAnswerChange}
        className="w-1/2 border p-2 rounded resize-none overflow-hidden whitespace-pre-wrap"
        rows={1}
      />
    </div>
  );
}