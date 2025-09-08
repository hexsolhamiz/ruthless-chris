"use client"

import { useState } from "react"
import { Hero } from "@/components/static/hero"
import { Sidebar } from "@/components/static/sidebar"

export default function RuthlessChrisPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}
