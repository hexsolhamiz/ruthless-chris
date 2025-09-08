"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "Slide One",
    content: "Beautiful content for the first slide",
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
    image: "/api/placeholder/60/60",
  },
  {
    id: 2,
    title: "Slide Two",
    content: "Amazing content for the second slide",
    color: "bg-gradient-to-br from-green-500 to-teal-600",
    image: "/api/placeholder/60/60",
  },
  {
    id: 3,
    title: "Slide Three",
    content: "Incredible content for the third slide",
    color: "bg-gradient-to-br from-orange-500 to-red-600",
    image: "/api/placeholder/60/60",
  },
  {
    id: 4,
    title: "Slide Four",
    content: "Fantastic content for the fourth slide",
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    image: "/api/placeholder/60/60",
  },
  {
    id: 5,
    title: "Slide Five",
    content: "Wonderful content for the fifth slide",
    color: "bg-gradient-to-br from-indigo-500 to-blue-600",
    image: "/api/placeholder/60/60",
  },
];

export default function FloatingCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const diff = currentX - startX;
    const threshold = 100;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (diff < 0 && currentSlide < slides.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }

    setDragOffset(0);
    setStartX(0);
    setCurrentX(0);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Carousel Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Slides */}
        <div
          ref={carouselRef}
          className="flex h-full transition-transform duration-700 ease-in-out cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(calc(-${currentSlide * 100}% + ${
              isDragging ? dragOffset : 0
            }px))`,
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
            <div
              key={slide.id}
              className={`min-w-full h-full flex items-center justify-center ${slide.color}`}
            >
              <div className="text-center text-white px-8 py-12 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20">
                <h1 className="text-6xl font-bold mb-6 text-white">
                  {slide.title}
                </h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto text-white">
                  {slide.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tilted chain-style navigation - no background container */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className="flex items-center"
            style={{
              transform: "perspective(300px) rotateX(200deg)",
              transformStyle: "preserve-3d",
              gap: "16px",
            }}
          >
            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const distance = Math.abs(index - currentSlide);

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  className={`relative rounded-full p-0 border-2 overflow-hidden transition-all duration-500 ease-out ${
                    isActive
                      ? "w-14 h-14 border-white shadow-2xl z-30"
                      : distance === 1
                      ? "w-12 h-12 border-white/80 shadow-lg z-20"
                      : "w-10 h-10 border-white/60 shadow-md z-10"
                  }`}
                  style={{
                    transform: `
                      translateZ(${
                        isActive ? "25px" : distance === 1 ? "15px" : "5px"
                      })
                      translateX(${
                        index < currentSlide
                          ? `-${distance * 8}px`
                          : index > currentSlide
                          ? `${distance * 8}px`
                          : "0px"
                      })
                      rotateY(${
                        index < currentSlide
                          ? "-15deg"
                          : index > currentSlide
                          ? "15deg"
                          : "0deg"
                      })
                      scale(${
                        isActive ? "1.1" : distance === 1 ? "0.95" : "0.85"
                      })
                    `,
                    background: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    marginLeft: index > 0 ? "-8px" : "0px",
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
                        boxShadow:
                          "0 0 25px rgba(255,255,255,0.6), inset 0 0 10px rgba(255,255,255,0.3)",
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
              );
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-10">
          <div
            className="h-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
