import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

interface SearchBarProps extends React.ComponentProps<typeof Input> {}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
      <Input
        type="search"
        placeholder="Search..."
        className={cn(
          "pl-9 bg-gray-50 border-gray-200 focus:bg-white transition-colors",
          className
        )}
        {...props}
      />
    </div>
  )
}
