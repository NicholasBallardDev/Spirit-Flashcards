import { CreateDeckDialog } from "@/features/deck/components/CreateDeckDialogue"
import { Plus } from "lucide-react"

export default function DeckCreationPrompt() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm py-30">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <Plus size={24} />
      </div>
      <h2 className="text-lg font-bold text-gray-900">
        Start creating flashcards
      </h2>
      <p className="mt-1 mb-6 text-gray-500">Study for your next test!</p>
      <CreateDeckDialog
        trigger={
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            Create Flashcards
          </button>
        }
      />
    </div>
  )
}
