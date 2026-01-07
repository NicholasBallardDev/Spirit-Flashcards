"use client"
import { CardStudyView } from "@/features/card/components/CardStudyView"
import { ScheduleContext } from "@/features/card/components/context"
import { RatingButtonTray } from "@/features/card/components/RatingButtonTray"
import { getDeck } from "@/server/services/deck.service"
import { updateSchedule } from "@/server/services/schedule.service"
import { FlashcardDeck } from "@/Types"
import { useEffect, useState } from "react"
import { Rating } from "ts-fsrs"
import { StudyAll } from "./StudyAll"

interface StudyClientProps {
  deck: FlashcardDeck
}

export function StudyClient({ deck }: StudyClientProps) {
  return (
    <>
      <div className="flex-col justify-center items-center h-[50vh]">
        <StudyAll deck={deck} />
      </div>
    </>
  )
}
