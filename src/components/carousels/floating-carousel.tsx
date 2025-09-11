"use client"

import Image from "next/image"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Hero } from "../static/hero"
import { LiveStream } from "../static/live-stream"
import MusicShowCarousel from "./music-show-carousel"
import { MusicMadness } from "../music/music-madness"
import { EventsCarousel } from "./events-carousel"

export default function FloatingCarousel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentX, setCurrentX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef(null)

  const slides = [
    {
      id: 1,
      title: "Slide One",
      content: <Hero onMenuClick={() => setIsSidebarOpen(true)}  />,
      color: "bg-gradient-to-br from-blue-500 to-purple-600",
      image: "/slides/slide1.png",
    },
    {
      id: 2,
      title: "Slide Two",
      content: <MusicMadness />,
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      image: "/slides/slide2.png",
    },
    {
      id: 3,
      title: "Slide Three",
      content: <MusicShowCarousel  />,
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      image: "/slides/slide3.png",
    },
    {
      id: 4,
      title: "Slide Four",
      content: <LiveStream  videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />,
      color: "",
      image: "/slides/slide4.png",
    },
    {
      id: 5,
      title: "Slide Five",
      content: <EventsCarousel />,
      color: "bg-gradient-to-br from-indigo-500 to-blue-600",
      image: "/slides/slide2.png",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, isDragging, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    setIsAutoPlaying(false)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
    setCurrentX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setCurrentX(clientX)
    const diff = clientX - startX
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    setIsDragging(false)
    const diff = currentX - startX
    const threshold = 100

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe right - go to previous slide (with looping)
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      } else {
        // Swipe left - go to next slide (with looping)
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }

    setDragOffset(0)
    setStartX(0)
    setCurrentX(0)
  }

  // Tilted Navigation Component
  const TiltedNavigation = () => {
    const getVisibleSlides = () => {
      const visibleCount = 5 // Show 5 slides in navigation
      const half = Math.floor(visibleCount / 2)
      const visibleSlides = []
      
      for (let i = -half; i <= half; i++) {
        const index = (currentSlide + i + slides.length) % slides.length
        visibleSlides.push({
          ...slides[index],
          originalIndex: index,
          relativePosition: i
        })
      }
      
      return visibleSlides
    }

    const visibleSlides = getVisibleSlides()

    return (
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div
          className="flex items-end justify-center"
          style={{
            transform: "perspective(400px) rotateY(-5deg)",
            transformStyle: "preserve-3d",
            gap: "8px",
            height: "80px",
          }}
        >
          {visibleSlides.map((slide) => {
            const relativePos = slide.relativePosition
            const isActive = relativePos === 0
            const distance = Math.abs(relativePos)

            return (
              <button
                key={`${slide.id}-${slide.originalIndex}`}
                onClick={() => goToSlide(slide.originalIndex)}
                className={`relative rounded-full p-0 border-2 overflow-hidden transition-all duration-500 ease-out ${
                  isActive
                    ? "w-16 h-16 border-white shadow-2xl z-30"
                    : distance === 1
                      ? "w-12 h-12 border-white/80 shadow-lg z-20"
                      : "w-10 h-10 border-white/60 shadow-md z-10"
                }`}
                style={{
                  transform: `
                    translateX(${
                      relativePos < 0 ? `-${distance * 4}px` : relativePos > 0 ? `${distance * 4}px` : "0px"
                    })
                    translateY(${isActive ? "20px" : distance === 1 ? "-10px" : "-30px"})
                    rotateY(${relativePos < 0 ? "-20deg" : relativePos > 0 ? "20deg" : "0deg"})
                    scale(${isActive ? "1.2" : distance === 1 ? "0.9" : "0.8"})
                  `,
                  background: isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <Image
                  width={100}
                  height={100}
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-full"
                />

                {/* Active indicator glow */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full border-2 border-white/80 animate-pulse"
                    style={{
                      boxShadow: "0 0 25px rgba(255,255,255,0.6), inset 0 0 10px rgba(255,255,255,0.3)",
                    }}
                  />
                )}

                {/* Subtle inner shadow for depth */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[600px] bg-gray-100">
      {/* Main Carousel Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Slides */}
        <div
          ref={carouselRef}
          className="flex h-full transition-transform duration-700 ease-in-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${isDragging ? dragOffset : 0}px))`,
            transition: isDragging ? "none" : "transform 0.7s ease-in-out",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {slides.map((slide) => (
            <div key={slide.id} className={`min-w-full h-full flex items-center justify-center`}>
                {slide.content}
            </div>
          ))}
        </div>

        {/* Tilted Navigation - Now Separated */}
        <TiltedNavigation />

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-10">
          <div
            className="h-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}