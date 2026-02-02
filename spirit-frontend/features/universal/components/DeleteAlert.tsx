import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReactNode } from "react"
import { DeleteAlertDialogAction } from "./DeleteDialogueAction"

interface DeleteAlertProps {
  children: ReactNode
  title?: string
  description?: string
  onDelete: () => void
}

const defaultTitle = "Are you absolutely sure?"
const defaultDesc = "Once you delete this card, it cannot be recovered."

export function DeleteAlert({
  children,
  title = defaultTitle,
  description = defaultDesc,
  onDelete,
}: DeleteAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteAlertDialogAction onDelete={onDelete}>
            Delete
          </DeleteAlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
