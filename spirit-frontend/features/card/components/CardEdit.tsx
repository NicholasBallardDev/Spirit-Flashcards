"use client";
import { Trash2 } from 'lucide-react';
import TextareaAutosize from "react-textarea-autosize";
import type { Card } from "@/Types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from 'react';


interface CardProps {
  card: Card;
  cardNo: number;
  onChange?: (card: Card) => void;
  onDelete?: (id: number) => void;
}

export function CardEdit({ card, cardNo, onDelete, onChange }: CardProps) {
  const question = card ? card.question : "";
  const answer = card ? card.answer : "";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  },[])

  const handleDelete = () => {
    if (card?.id) {
      onDelete?.(card.id);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.({ ...card, question: e.target.value });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.({ ...card, answer: e.target.value });
  };

  return (
    <div
      className=
        "px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer flex-col gap-4 items-start"
    >
      <div className='flex justify-between mb-1 mx-1'>
        {cardNo}
        {mounted && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="group p-2 rounded hover:bg-red-500 transition rounded-full cursor-pointer">
                <Trash2 size={20} className="text-gray-700 group-hover:text-white"/>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Once you delete this card, it cannot be recovered. 
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className='flex gap-4'>
        <TextareaAutosize
          value={question}
          onChange={(e) => onChange?.({ ...card, question: e.target.value })}
          className="w-1/2 border p-2 rounded resize-none"
          minRows={1}
        />
        <TextareaAutosize
          value={answer}
          onChange={(e) => onChange?.({ ...card, answer: e.target.value })}
          className="w-1/2 border p-2 rounded resize-none"
          minRows={1}
        />
      </div>
    </div>
  );
}