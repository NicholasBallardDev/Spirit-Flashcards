import { MetricCard } from "@/features/dashboard/components/MetricCard"
import { countCards, countDueCards } from "@/server/services/card.service"
import { countDecks } from "@/server/services/deck.service"
export default async function MetricTray() {
  const cardCount = await countCards()
  const deckCount = await countDecks()
  const dueCards = await countDueCards()

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="w-full max-w-6xl px-6">
        <h1 className="ml-2 font-bold text-2xl">Overview</h1>
        <div className="flex mt-4 gap-10">
          <MetricCard
            key={1}
            number={deckCount}
            title={"Total Decks"}
            subtitle={"You have quite alot to study!"}
          />
          <MetricCard
            key={2}
            number={cardCount}
            title={"Total Cards"}
            subtitle={"Keep up and study hard!"}
          />
          <MetricCard
            key={3}
            number={dueCards}
            title={"Cards Due"}
            subtitle={"Do your daily reviews!"}
          />
        </div>
      </div>
    </div>
  )
}
