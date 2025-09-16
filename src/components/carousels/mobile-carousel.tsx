"use client"
import React, { useState } from "react"
import { Home, User, Settings, Star } from "lucide-react"

export default function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)

  const items = [
    { icon: <Home size={28} />, color: "bg-blue-500" },
    { icon: <User size={28} />, color: "bg-green-500" },
    { icon: <Settings size={28} />, color: "bg-red-500" },
    { icon: <Star size={28} />, color: "bg-yellow-500" },
  ]

  // Create looped array for infinite scroll effect
  const getLoopedItems = () => {
    const extendedItems = [...items, ...items, ...items] // Triple the items for smooth looping
    return extendedItems
  }

  const loopedItems = getLoopedItems()
  const slideWidth = 88 // 64px width + 24px margin
  const centerOffset = items.length // Start from middle set

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX || 0
    setStartX(clientX)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX || 0
    const deltaX = clientX - startX
    setTranslateX(deltaX)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    
    const threshold = slideWidth / 3
    
    if (translateX > threshold) {
      setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
    } else if (translateX < -threshold) {
      setCurrentIndex(prev => (prev + 1) % items.length)
    }
    
    setIsDragging(false)
    setTranslateX(0)
    setStartX(0)
  }

  const getSlideStyle = (index: number) => {
    // Calculate position relative to center
    // const actualIndex = index % items.length
    const currentPos = (currentIndex + centerOffset) % loopedItems.length
    const slidePos = index
    
    // Calculate distance from center considering looping
    let distance = slidePos - currentPos
    
    // Adjust for looping wrap-around
    if (distance > items.length / 2) {
      distance -= items.length
    } else if (distance < -items.length / 2) {
      distance += items.length
    }
    
    const baseTranslateX = distance * slideWidth + translateX
    
    // Active slide (center): lower and larger
    if (distance === 0) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(10px) scale(1.1)`,
        zIndex: 10,
        opacity: 1,
      }
    }
    // Adjacent slides: elevated and smaller
    else if (Math.abs(distance) === 1) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-5px) scale(0.9)`,
        zIndex: 5,
        opacity: 1,
      }
    }
    // Outer slides: most elevated and smallest
    else {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-10px) scale(0.8)`,
        zIndex: 1,
        opacity: Math.abs(distance) > 2 ? 0.5 : 0.8,
      }
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto py-8">
      <div 
        className="relative h-24 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {loopedItems.map((item, index) => (
            <div
              key={index}
              className="absolute transition-all duration-300 ease-out"
              style={getSlideStyle(index)}
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-full ${item.color} text-white shadow-md cursor-pointer`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}