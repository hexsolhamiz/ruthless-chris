"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: string
  icon: React.ReactNode
  label: string
  backgroundImage: string
}

interface CircularIconsCarouselProps {
  items: CarouselItem[]
  className?: string
}

export function CircularCarousel({ items, className }: CircularIconsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBackgroundDragging, setIsBackgroundDragging] = useState(false)
  const [backgroundDragStart, setBackgroundDragStart] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)

  const getVisibleItems = () => {
    const visibleItems = []
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + items.length) % items.length
      visibleItems.push({
        ...items[index],
        originalIndex: index,
        position: i,
      })
    }
    return visibleItems
  }

  const getBackgroundImages = () => {
    const backgroundImages = []
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + items.length) % items.length
      backgroundImages.push({
        ...items[index],
        originalIndex: index,
        position: i,
      })
    }
    return backgroundImages
  }

  const handleIconClick = (originalIndex: number) => {
    if (!isDragging) {
      setActiveIndex(originalIndex)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(false)
    setDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== 0) {
      const diff = Math.abs(e.clientX - dragStart)
      if (diff > 5) {
        setIsDragging(true)
      }
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isDragging) {
      const diff = e.clientX - dragStart
      const threshold = 50

      if (diff > threshold) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      } else if (diff < -threshold) {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }
    }
    setIsDragging(false)
    setDragStart(0)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(false)
    setDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== 0) {
      const diff = Math.abs(e.touches[0].clientX - dragStart)
      if (diff > 5) {
        setIsDragging(true)
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isDragging && e.changedTouches[0]) {
      const diff = e.changedTouches[0].clientX - dragStart
      const threshold = 50

      if (diff > threshold) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      } else if (diff < -threshold) {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }
    }
    setIsDragging(false)
    setDragStart(0)
  }

  const handleBackgroundMouseDown = (e: React.MouseEvent) => {
    setIsBackgroundDragging(false)
    setBackgroundDragStart(e.clientX)
  }

  const handleBackgroundMouseMove = (e: React.MouseEvent) => {
    if (backgroundDragStart !== 0) {
      const diff = Math.abs(e.clientX - backgroundDragStart)
      if (diff > 5) {
        setIsBackgroundDragging(true)
      }
    }
  }

  const handleBackgroundMouseUp = (e: React.MouseEvent) => {
    if (isBackgroundDragging) {
      const diff = e.clientX - backgroundDragStart
      const threshold = 50

      if (diff > threshold) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      } else if (diff < -threshold) {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }
    }
    setIsBackgroundDragging(false)
    setBackgroundDragStart(0)
  }

  const handleBackgroundTouchStart = (e: React.TouchEvent) => {
    setIsBackgroundDragging(false)
    setBackgroundDragStart(e.touches[0].clientX)
  }

  const handleBackgroundTouchMove = (e: React.TouchEvent) => {
    if (backgroundDragStart !== 0) {
      const diff = Math.abs(e.touches[0].clientX - backgroundDragStart)
      if (diff > 5) {
        setIsBackgroundDragging(true)
      }
    }
  }

  const handleBackgroundTouchEnd = (e: React.TouchEvent) => {
    if (isBackgroundDragging && e.changedTouches[0]) {
      const diff = e.changedTouches[0].clientX - backgroundDragStart
      const threshold = 50

      if (diff > threshold) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
      } else if (diff < -threshold) {
        setActiveIndex((prev) => (prev + 1) % items.length)
      }
    }
    setIsBackgroundDragging(false)
    setBackgroundDragStart(0)
  }

  const visibleItems = getVisibleItems()
  const backgroundImages = getBackgroundImages()

  return (
    <div className={cn("relative flex flex-col items-center gap-8 p-8 min-h-screen overflow-hidden", className)}>
      <motion.div
        ref={backgroundRef}
        className="absolute inset-0 flex items-center justify-center"
        onMouseDown={handleBackgroundMouseDown}
        onMouseMove={handleBackgroundMouseMove}
        onMouseUp={handleBackgroundMouseUp}
        onMouseLeave={handleBackgroundMouseUp}
        onTouchStart={handleBackgroundTouchStart}
        onTouchMove={handleBackgroundTouchMove}
        onTouchEnd={handleBackgroundTouchEnd}
        style={{ cursor: isBackgroundDragging ? "grabbing" : "grab" }}
      >
        <AnimatePresence mode="wait">
          {backgroundImages.map((item) => {
            const isActive = item.position === 0
            const distance = Math.abs(item.position)

            return (
              <motion.div
                key={`bg-${item.id}-${activeIndex}`}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.backgroundImage})`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  x: item.position * 100,
                }}
                animate={{
                  opacity: isActive ? 1 : distance === 1 ? 0.3 : 0,
                  scale: isActive ? 1 : 0.95 - distance * 0.05,
                  x: item.position * 20,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.85,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            )
          })}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <div className="relative z-20 flex items-center justify-center w-full max-w-2xl">
        <motion.div
          ref={containerRef}
          className={cn("flex items-center justify-center gap-0 select-none", isDragging && "cursor-grabbing")}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {visibleItems.map((item) => {
            const isActive = item.position === 0
            const distance = Math.abs(item.position)

            return (
              <motion.button
                key={`${item.id}-${item.position}`}
                onClick={() => handleIconClick(item.originalIndex)}
                className={cn(
                  "relative flex items-center justify-center rounded-full border-2",
                  "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                )}
                initial={{
                  scale: 0.5,
                  opacity: 0,
                  x: item.position * 50,
                }}
                animate={{
                  width: isActive ? 80 : 64,
                  height: isActive ? 80 : 64,
                  scale: isActive ? 1.1 : distance === 1 ? 0.9 : 0.75,
                  opacity: distance === 2 ? 0.5 : distance === 1 ? 0.75 : 1,
                  y: isActive ? 0 : -8,
                  x: item.position * 100,
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
                  borderColor: isActive ? "hsl(var(--primary))" : "rgba(255, 255, 255, 0.5)",
                }}
                whileHover={{
                  scale: isActive ? 1.15 : 1.05,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{
                  backdropFilter: "blur(8px)",
                  boxShadow: isActive ? "0 20px 40px rgba(0, 0, 0, 0.3)" : "0 8px 16px rgba(0, 0, 0, 0.1)",
                }}
                aria-label={`Select ${item.label}`}
              >
                <motion.div
                  className={cn("transition-colors duration-300", isActive ? "text-gray-800" : "text-gray-600")}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  {item.icon}
                </motion.div>
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <div className="relative z-20 text-center">
        <AnimatePresence mode="wait">
          <motion.h3
            key={activeIndex}
            className="text-xl font-semibold text-gray-900 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {items[activeIndex]?.label}
          </motion.h3>
        </AnimatePresence>
      </div>
    </div>
  )
}
