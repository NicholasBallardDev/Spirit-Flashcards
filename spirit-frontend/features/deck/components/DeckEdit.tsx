"use client"
import TextareaAutosize from "react-textarea-autosize"
import { useState } from "react"

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
        <label
          htmlFor="title-input"
          className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1"
        >
          Title
        </label>
        <TextareaAutosize
          id="title-input"
          className="w-full border p-2 rounded resize-none pt-4"
          minRows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="relative w-full mt-4">
        {" "}
        <label
          htmlFor="description-input"
          className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1"
        >
          Description
        </label>
        <TextareaAutosize
          id="description-input"
          className="w-full border p-2 rounded resize-none pt-4"
          minRows={1}
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  )
}
