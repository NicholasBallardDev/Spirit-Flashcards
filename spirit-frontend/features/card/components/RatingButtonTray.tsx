import { Schedule } from "@/Types/schedule"
import { getPreview } from "@/server/services/schedule.service"
import { useEffect } from "react"
import { RatingButton } from "./RatingButton"

interface RatingButtonTrayProps {}

export function RatingButtonTray() {
  const btn =
    "px-4 py-2 rounded-full text-white text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40 bg-[#1D4ED8] hover:bg-[#2563EB]"
  return (
    <div className="flex justify-center items-center gap-4 w-full">
      <RatingButton text="Hello" />
    </div>
  )
}
