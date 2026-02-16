import { Trash2 } from "lucide-react"
import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const DeleteCardButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      aria-label="Delete Card"
      className={cn(
        "hover:bg-red-100 cursor-pointer transition-colors bg-white group",
        className,
      )}
      {...props}
    >
      <Trash2 size={24} className="text-gray-500 group-hover:text-red-500" />
    </Button>
  )
})

DeleteCardButton.displayName = "DeleteCardButton"
