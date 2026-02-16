import { Button } from "@/components/ui/button"
import { ImagePlus } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"

export const ImageButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      aria-label="Add Image to Card"
      className={cn(
        "hover:bg-green-100 cursor-pointer transition-colors bg-white",
        className,
      )}
      {...props}
    >
      <ImagePlus size={24} className="text-gray-500" />
    </Button>
  )
})

ImageButton.displayName = "ImageButton"
