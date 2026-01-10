import TextareaAutosize from "react-textarea-autosize"
import React from "react"

interface LabelledInputProps extends Omit<
  React.ComponentProps<typeof TextareaAutosize>,
  "id"
> {
  id: string
  inputTitle: string
}

export function LabelledInput({
  id,
  inputTitle,
  ...props
}: LabelledInputProps) {
  return (
    <div className="relative w-full mt-4">
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 text-xs text-gray-500 bg-white px-1"
      >
        {inputTitle}
      </label>
      <TextareaAutosize
        id={id}
        className="w-full border p-2 rounded resize-none pt-4"
        minRows={1}
        {...props}
      />
    </div>
  )
}
