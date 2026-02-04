import { Button } from "@/components/ui/button"
import { ComponentPropsWithoutRef } from "react"

interface DeleteButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  onDelete: () => void
}

export const DeleteButton = ({ onDelete, ...props }: DeleteButtonProps) => {
  return (
    <Button
      onClick={onDelete}
      className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
      {...props}
    >
      Delete
    </Button>
  )
}
