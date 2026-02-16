import type { Card } from "@/Types"
import { ImageButton } from "@/features/universal/components/ImageButton"
import { DeleteAlert } from "@/features/universal/components/DeleteAlert"
import { DeleteCardButton } from "./DeleteCardButton"
import ImageUploadModal from "@/features/universal/components/ImageUploadModal"
import { LabelledInput } from "@/features/universal/components/LabelledInput"

interface CardProps {
  card: Card
  cardNo: number
  onChange?: (card: Card) => void
  onDelete?: (id: number) => void
}

export function CardEdit({ card, cardNo, onDelete, onChange }: CardProps) {
  const question = card ? card.question : ""
  const answer = card ? card.answer : ""

  const handleDelete = () => {
    if (card?.id) {
      onDelete?.(card.id)
    }
  }

  return (
    <div className="px-6 py-6 min-w-24 w-full border rounded-md flex-col gap-4 items-start">
      <div className="flex justify-between mb-1 mx-1">
        {cardNo}
        <DeleteAlert onDelete={handleDelete}>
          <DeleteCardButton />
        </DeleteAlert>
      </div>

      <div className="flex gap-4">
        <LabelledInput
          inputTitle="Question"
          id={`text-question-${cardNo}`}
          value={question}
          onChange={(e) => onChange?.({ ...card, question: e.target.value })}
          minRows={1}
          maxRows={3}
        />
        <LabelledInput
          inputTitle="Answer"
          id={`text-answer-${cardNo}`}
          value={answer}
          onChange={(e) => onChange?.({ ...card, answer: e.target.value })}
          minRows={1}
          maxRows={3}
        />
      </div>
      <ImageUploadModal card={card} onCardChange={onChange}>
        <ImageButton />
      </ImageUploadModal>
    </div>
  )
}
