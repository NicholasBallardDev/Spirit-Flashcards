import { Button } from "@/components/ui/button"
import { CreateDeckDialog } from "./CreateDeckDialogue"
import { Plus } from "lucide-react"

export default function CreateDeckButton() {
  return (
    <CreateDeckDialog
      trigger={
        <Button className="bg-blue-600 hover:bg-blue-500">
          Create Deck
          <Plus />
        </Button>
      }
    ></CreateDeckDialog>
  )
}
