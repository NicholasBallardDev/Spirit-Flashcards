import { Rating, Schedule } from "@/Types/schedule"
import { getPreview } from "@/server/services/schedule.service"
import { useEffect } from "react"
import { RatingButton } from "./RatingButton"

interface RatingButtonTrayProps {}

export function RatingButtonTray() {
  const RATINGS = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as const
  const LABELS: Record<number, string> = {
    [Rating.Again]: "Again",
    [Rating.Hard]: "Hard",
    [Rating.Good]: "Good",
    [Rating.Easy]: "Easy",
  }
  return (
    <div className="flex justify-center items-center gap-8 w-full">
      {RATINGS.map((r) => {
        return <RatingButton text={LABELS[r]} key={r} rating={r} />
      })}
    </div>
  )
}
