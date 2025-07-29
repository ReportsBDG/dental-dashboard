import * as React from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, ...props }: SidebarTriggerProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        "h-10 w-10 rounded-md hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </button>
  )
} 