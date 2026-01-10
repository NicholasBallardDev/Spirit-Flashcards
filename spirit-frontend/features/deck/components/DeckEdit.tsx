import { LabelledInput } from "@/features/universal/components/LabelledInput"

interface DeckEditProps {
  title: string
  description: string | undefined
}

export function DeckEdit({ title, description }: DeckEditProps) {
  return (
    <div className="relative mb-4">
      <div className="relative w-full">
        <LabelledInput
          id="title-input"
          inputTitle={"Title"}
          value={title}
          onChange={() => {}}
          readOnly
        />
      </div>
      <LabelledInput
        id="description-input"
        inputTitle={"Description"}
        value={description ?? ""}
        onChange={() => {}}
        readOnly
      />
    </div>
  )
}
