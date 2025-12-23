import { Schedule } from "@/Types/schedule"
import { createContext, useContext } from "react"
import { Rating } from "ts-fsrs"

type ScheduleContextType = {
  schedule: Schedule
  onRate: (rating: Rating) => void
}

export const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
)

export function useScheduleContext() {
  const scheduleContext = useContext(ScheduleContext)!

  if (!scheduleContext) {
    throw new Error("useScheduleContext must be used with a Schedule Context")
  }

  return scheduleContext
}
