import TextareaAutosize from "react-textarea-autosize"
import React from "react"
import { cn } from "@/lib/utils"

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
  className,
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
        className={cn("w-full border p-2 rounded resize-none pt-4", className)}
        minRows={1}
        {...props}
      />
    </div>
  )
}
