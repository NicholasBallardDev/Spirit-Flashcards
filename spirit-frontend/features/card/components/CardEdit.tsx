"use client";
import TextareaAutosize from "react-textarea-autosize";
import type { Card } from "@/Types";

interface CardProps {
  card?: Card;
  onClick?: (id: number) => void;
}

export function CardEdit({ card, onClick }: CardProps) {
  const question = card ? card.question : "";
  const answer = card ? card.answer : "";

  return (
    <div
      className=
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer flex gap-4 items-start"
    >
      <TextareaAutosize
        defaultValue={question}
        className="w-1/2 border p-2 rounded resize-none"
        minRows={1}
      />
      <TextareaAutosize
        defaultValue={answer}
        className="w-1/2 border p-2 rounded resize-none"
        minRows={1}
      />
    </div>
  );
}