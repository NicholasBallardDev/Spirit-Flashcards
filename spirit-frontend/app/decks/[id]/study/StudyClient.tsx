"use client"

import { FlashcardDeck } from "@/Types"

import { StudyAll } from "./StudyAll"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { StudySpaced } from "./StudySpaced"
interface StudyClientProps {
  deck: FlashcardDeck
}

export function StudyClient({ deck }: StudyClientProps) {
  const [isToggled, setToggled] = useState(false)
  function toggle() {
    setToggled(!isToggled)
  }
  return (
    <>
      <div className="flex gap-2 my-2">
        <Label htmlFor="track-progress">Track Progress</Label>
        <Switch
          id="track-progress"
          checked={isToggled}
          onClick={toggle}
          className=" data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 "
        />
      </div>
      <div className="flex-col justify-center items-center h-[50vh]">
        {isToggled ? <StudySpaced deck={deck} /> : <StudyAll deck={deck} />}
      </div>
    </>
  )
}
