import { getDeck } from "@/server/services/deck.service"
import { StudyClient } from "./StudyClient"
import { BackButton } from "@/features/universal/components/BackButton"

export default async function StudyPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const deckId = parseInt((await params).id)
  const deck = await getDeck(deckId)
  return (
    <div className="flex justify-center">
      <BackButton />
      <div className="h-[50vh] w-2/3">
        <StudyClient deck={deck} />
      </div>
    </div>
  )
}
