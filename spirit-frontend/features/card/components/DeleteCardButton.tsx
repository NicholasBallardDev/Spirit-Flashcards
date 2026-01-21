import { Trash2 } from "lucide-react"
import React from "react"

export const DeleteCardButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>((props, ref) => {
  return (
    <button
      ref={ref}
      className="group p-2 rounded hover:bg-red-500 transition rounded-full cursor-pointer"
      {...props}
    >
      <Trash2 size={20} className="text-gray-700 group-hover:text-white" />
    </button>
  )
})

DeleteCardButton.displayName = "DeleteCardButton"
