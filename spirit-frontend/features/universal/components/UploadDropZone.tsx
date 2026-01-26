import { ImageUp } from "lucide-react"
import React from "react"
import { cn } from "@/lib/utils"

export const UploadDropZone = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "mb-2 border-2 border-dashed border-blue-200 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50/60 transition-colors group",
        className,
      )}
      {...props}
    >
      <div className="bg-white p-2.5 rounded-xl shadow-sm mb-3 group-hover:scale-105 transition-transform">
        <ImageUp className="h-6 w-6 text-gray-600" />
      </div>
      <p className="text-sm text-gray-600 mb-1">
        <span className="text-blue-600 font-semibold hover:underline">
          Click to upload
        </span>{" "}
        or drag and drop
      </p>
      <p className="text-xs text-gray-400">Max. File Size: 15MB</p>
    </div>
  )
})

UploadDropZone.displayName = "UploadDropZone"
