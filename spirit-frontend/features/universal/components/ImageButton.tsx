import { ImagePlus } from "lucide-react"

export function ImageButton() {
  return (
    <div className="w-12 h-12 border rounded-md flex items-center justify-center hover:bg-gray-100 transition-colors">
      <ImagePlus size={24} className="text-gray-500" />
    </div>
  )
}
