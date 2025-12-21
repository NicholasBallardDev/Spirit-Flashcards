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

  if (!schedule) return null

  return (
    <>
      <div>
        <button className={`${btn} basis-36`} onClick={() => onRate("Renew")}>
          {text}
        </button>
        {previews
          ? Math.round(
              (new Date(previews[Rating.Again].card.due).getTime() -
                new Date(previews[Rating.Again].card.last_review!).getTime()) /
                (1000 * 60 * 60 * 24)
            ) + " days"
          : ""}
      </div>
    </>
  )
}
