"use client"
import TextareaAutosize from "react-textarea-autosize"
import { useState } from "react"
import { LabelledInput } from "@/features/universal/components/LabelledInput"

interface DeckEditProps {
  title: string
  description: string | undefined
}

export function DeckEdit({
  title: initialTitle,
  description: initialDescription,
}: DeckEditProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)

  return (
    <div className="relative mb-4">
      <div className="relative w-full">
        <LabelledInput
          id="title-input"
          inputTitle={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly
        />
      </div>
      <LabelledInput
        id="description-input"
        inputTitle={"Description"}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        readOnly
      />
    </div>
  )
}
