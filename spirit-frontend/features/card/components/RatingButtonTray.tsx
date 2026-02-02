import { Rating } from "@/Types/schedule"
import { RatingButton } from "./RatingButton"

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
