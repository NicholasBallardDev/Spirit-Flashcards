import { Rating, Schedule } from "@/Types/schedule"
import { useScheduleContext } from "./context"
import { getPreview, getSchedule } from "@/server/services/schedule.service"
import { useEffect, useState } from "react"
import { IPreview, RecordLog } from "ts-fsrs"

interface RatingButtonProps {
  text: string
}

export function RatingButton({ text }: RatingButtonProps) {
  const btn =
    "px-4 py-2 rounded-full text-white text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40 bg-[#1D4ED8] hover:bg-[#2563EB]"

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
    const a = previews[Rating.Again].card.due
    const b = previews[Rating.Again].card.last_review!

    const diffMs = new Date(a).getTime() - new Date(b).getTime()

    const minutes = Math.round(diffMs / (1000 * 60))
    const hours = Math.round(diffMs / (1000 * 60 * 60))
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24))

    const lessThanHour = Math.abs(diffMs) < 1000 * 60 * 60
    const lessThanDay = Math.abs(diffMs) < 1000 * 60 * 60 * 24

    if (lessThanHour) {
      return `${minutes}m`
    } else if (lessThanDay) {
      return `${hours}h`
    }

    return `${days}d`
  }

  if (!schedule) return null

  return (
    <>
      <div className="flex-row text-center">
        <p>{previews ? formatTimeDiff(previews) : ""}</p>
        <button className={`${btn} basis-36`} onClick={() => onRate("Renew")}>
          {text}
        </button>
      </div>
    </>
  )
}
