import { Rating, Schedule } from "@/Types/schedule"
import { useScheduleContext } from "../context/context"
import { getPreview, getSchedule } from "@/server/services/schedule.service"
import { useEffect, useState } from "react"
import { IPreview, RecordLog } from "ts-fsrs"
import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns"

interface RatingButtonProps {
  text: string
  rating: Exclude<Rating, Rating.Manual>
}

export function RatingButton({ text, rating }: RatingButtonProps) {
  const btn =
    "px-4 py-2 floored-full text-white text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40 bg-[#1D4ED8] hover:bg-[#2563EB]"

  const { schedule, onRate } = useScheduleContext()
  const [previews, setPreviews] = useState<IPreview | null>(null)

  useEffect(() => {
    if (!schedule) return

    async function loadPreview() {
      const previews = await getPreview(schedule.id)
      setPreviews(previews)
    }
    loadPreview()
  }, [schedule.id])

  function formatTimeDiff(previews: IPreview) {
    const dueDate = previews[rating].card.due
    const lastReviewDate = previews[rating].card.last_review!
    const due = new Date(dueDate)
    const last = new Date(lastReviewDate)

    const diffMinutes = differenceInMinutes(due, last)
    const diffHours = differenceInHours(due, last)
    const diffDays = differenceInDays(due, last)

    if (diffMinutes < 60) return `<${diffMinutes}m`
    if (diffHours < 24) return `${diffHours}h`

    return `${diffDays}d`
  }

  return (
    <>
      <div className="flex-row text-center">
        <p>{previews ? formatTimeDiff(previews) : ""}</p>
        <button
          className={`${btn} basis-36 w-24 rounded-full`}
          onClick={() => onRate(rating)}
        >
          {text}
        </button>
      </div>
    </>
  )
}
