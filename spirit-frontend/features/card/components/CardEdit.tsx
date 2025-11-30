"use client";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { Card } from "@/Types";
import { cn } from "@/lib/utils";

interface CardProps {
  card: Card;
  onClick?: (id: number) => void;
}

export function CardEdit({ card, onClick }: CardProps) {
  const question = card.question;
  const answer = card.answer;

  return (
    <div
      className={cn(
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer hover:bg-gray-50 transition flex gap-4 items-start"
      )}
      onClick={() => onClick?.(card.id)}
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