"use client"

import { Schedule } from "@/Types/schedule"
import { Rating } from "ts-fsrs"
import { ReactNode } from "react"
import { ScheduleContext } from "./context"

interface ScheduleContextProviderProps {
  children: ReactNode
  schedule: Schedule
  onRate: (rating: Rating) => void
}

export function ScheduleContextProvider({
  children,
  schedule,
  onRate,
}: ScheduleContextProviderProps) {
  return (
    <ScheduleContext.Provider value={{ schedule, onRate }}>
      {children}
    </ScheduleContext.Provider>
  )
}
