"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Wifi, Monitor, Info, Phone, Mail, Share2 } from "lucide-react"

const navigationItems = [
  { id: "live", icon: Wifi, label: "live" },
  { id: "display", icon: Monitor, label: "Display" },
  { id: "info", icon: Info, label: "Info" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "share", icon: Share2, label: "Share" },
]

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("live")

  return (
    <nav className="sticky bottom-0 w-full right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors",
                "hover:bg-accent hover:text-accent-foreground rounded-md",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
