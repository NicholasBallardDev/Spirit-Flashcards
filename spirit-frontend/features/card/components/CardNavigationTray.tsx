import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { ArrowLeftIcon } from "lucide-react"

interface NavTrayProps {}

export function CardNavigationTray() {
  return (
    <div className="flex justify-center items-center gap-8 w-full">
      <Button className="bg-blue-200 text-blue-700 hover:bg-blue-300 h-14 w-18 rounded-full">
        <ArrowLeftIcon className="!size-6" />
      </Button>

      <p>Hi</p>

      <Button className="bg-blue-200 text-blue-700 hover:bg-blue-300 h-14 w-18 rounded-full">
        <ArrowRightIcon className="!size-6" />
      </Button>
    </div>
  )
}
