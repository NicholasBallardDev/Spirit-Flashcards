import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import React from "react"

interface RemoveButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export default function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-gray-200 hover:bg-gray-300 rounded-full w-[30px] h-[30px] cursor-pointer p-0 flex items-center justify-center"
    >
      <X color="black" />
    </Button>
  )
}
