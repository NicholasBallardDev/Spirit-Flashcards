"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackButton() {
  const router = useRouter()

  const handleBackClick = () => {
    router.back()
  }

  return (
    <Button
      variant="ghost"
      onClick={handleBackClick}
      className="flex items-center gap-2"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </Button>
  )
}
