import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
export default function RemoveButton() {
  return (
    <Button className="bg-gray-200 hover:bg-gray-300 rounded-full w-[30px] h-[30px] cursor-pointer p-0 flex items-center justify-center">
      <X color="black" />
    </Button>
  )
}
