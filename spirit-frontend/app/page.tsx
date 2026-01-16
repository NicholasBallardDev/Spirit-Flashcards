import DeckCreationPrompt from "@/features/dashboard/components/DeckCreationPrompt"
import { MetricCard } from "@/features/dashboard/components/MetricCard"
import MetricTray from "@/features/dashboard/components/MetricTray"
import RecentDeckGroup from "@/features/dashboard/components/RecentDeckGroup"
export default function Home() {
  return (
    <>
      <MetricTray />
      <RecentDeckGroup />
    </>
  )
}
