"use client"
import TextareaAutosize from "react-textarea-autosize"
import type { Card } from "@/Types"
import { useEffect, useState } from "react"
import { ImageButton } from "@/features/universal/components/ImageButton"
import { ImageUploader } from "@/features/universal/components/ImageUploader"
import { DeleteAlert } from "@/features/universal/components/DeleteAlert"
import { DeleteCardButton } from "./DeleteCardButton"

interface CardProps {
  card: Card
  cardNo: number
  onChange?: (card: Card) => void
  onDelete?: (id: number) => void
}

export function CardEdit({ card, cardNo, onDelete, onChange }: CardProps) {
  const question = card ? card.question : ""
  const answer = card ? card.answer : ""
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDelete = () => {
    if (card?.id) {
      onDelete?.(card.id)
    }
  }

  return (
    <div className="px-6 py-6 min-w-24 w-full border rounded-md cursor-pointer flex-col gap-4 items-start">
      <div className="flex justify-between mb-1 mx-1">
        {cardNo}
        {mounted && (
          <DeleteAlert onDelete={handleDelete}>
            <DeleteCardButton />
          </DeleteAlert>
        )}
      </div>

      <div className="flex gap-4">
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
      <ImageUploader cardId={card.id} imageType="questionImage">
        <ImageButton />
      </ImageUploader>
    </div>
  )
}
