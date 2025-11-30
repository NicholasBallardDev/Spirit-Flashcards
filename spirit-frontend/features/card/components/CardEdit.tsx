"use client";
import { Trash2 } from 'lucide-react';
import TextareaAutosize from "react-textarea-autosize";
import type { Card } from "@/Types";

interface CardProps {
  card?: Card;
  cardNo: number;
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

export function CardEdit({ card, cardNo: index, onDelete, onClick }: CardProps) {
  const question = card ? card.question : "";
  const answer = card ? card.answer : "";

  const handleDelete = () => {
    if (card?.id) {
      onDelete?.(card.id);
    }
  };

  return (
    <div
      className=
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer flex-col gap-4 items-start"
    >
      <div className='flex justify-between mb-1 mx-1'>
        {index}
        <button
          className="group p-2 rounded hover:bg-red-500 transition rounded-full cursor-pointer" onClick={handleDelete}>
          <Trash2 size={20} className="text-gray-700 group-hover:text-white"/>
        </button>
      </div>

      <div className='flex gap-4'>
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
    </div>
  );
}