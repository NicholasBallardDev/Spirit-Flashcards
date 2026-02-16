import { AlertDialogAction } from "@/components/ui/alert-dialog"
import { ComponentPropsWithoutRef } from "react"

interface DeleteAlertDialogActionProps extends ComponentPropsWithoutRef<
  typeof AlertDialogAction
> {
  onDelete: () => void
}

export const DeleteAlertDialogAction = ({
  onDelete,
  ...props
}: DeleteAlertDialogActionProps) => {
  return (
    <AlertDialogAction
      onClick={onDelete}
      className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 cursor-pointer"
      {...props}
    >
      Delete
    </AlertDialogAction>
  )
}
