"use client";
import { useState, useRef, useEffect } from "react";
import type { Card } from "@/Types";
import { cn } from "@/lib/utils";

interface CardProps {
  card: Card;
  onClick?: (id: number) => void;
}

export function CardEdit({ card, onClick }: CardProps) {
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const autoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
    autoResize(e);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    autoResize(e);
  };

  return (
    <div className={cn("px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer hover:bg-gray-50 transition flex gap-4 items-start")}
      onClick={() => onClick?.(card.id)}
    >
      <textarea
        value={question}
        onChange={handleQuestionChange}
        className="w-1/2 border p-2 rounded resize-none overflow-hidden"
        rows={1}
      />
      <textarea
        value={answer}
        onChange={handleAnswerChange}
        className="w-1/2 border p-2 rounded resize-none overflow-hidden"
        rows={1}
      />
    </div>
  );
}