"use client";

import React, { useEffect, useRef, useState } from "react";
import { items } from "@/data/slides";

export default function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(8);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [bgTranslateX, setBgTranslateX] = useState(0);
  const [bgIsDragging, setBgIsDragging] = useState(false);
  const [bgStartX, setBgStartX] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Reset scroll to top when slide changes
  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex];
    if (currentItem) {
      // Force scroll to top immediately
      currentItem.scrollTop = 0;
    }
  }, [currentIndex]);

  const slideWidth = 85;

  // --- Icon Carousel Handlers ---
  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true);
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    setStartX(clientX);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const threshold = slideWidth / 3;
    let nextIndex = currentIndex;

    if (translateX > threshold) {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (translateX < -threshold) {
      nextIndex = (currentIndex + 1) % items.length;
    }

    if (nextIndex !== currentIndex) {
      handleChangeSlide(nextIndex);
    }

    setIsDragging(false);
    setTranslateX(0);
    setStartX(0);
  };

  // --- Background Carousel Handlers ---
  const handleBgMouseDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    setBgIsDragging(true);
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    setBgStartX(clientX);
  };

  const handleBgMouseMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!bgIsDragging) return;
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    const deltaX = clientX - bgStartX;
    setBgTranslateX(deltaX);
  };

  const handleBgMouseUp = () => {
    if (!bgIsDragging) return;

    const threshold = 100;
    let nextIndex = currentIndex;

    if (bgTranslateX > threshold && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (bgTranslateX < -threshold && currentIndex < items.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== currentIndex) {
      handleChangeSlide(nextIndex);
    }

    setBgIsDragging(false);
    setBgTranslateX(0);
    setBgStartX(0);
  };

  // --- Change slide + update indices ---
  const handleChangeSlide = (newIndex: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  // --- Style helpers ---
  const getSlideClass = (index: number) => {
    if (index === currentIndex) {
      return "z-20 scale-100 translate-y-1 opacity-100 shadow-xl transition-all duration-300";
    }
    if (index === prevIndex) {
      return "z-10 scale-80 opacity-90 translate-y-0 transition-all duration-300";
    }
    return "z-0 scale-90 opacity-90 translate-y-0 transition-all duration-300";
  };

  const getSlideStyle = (index: number) => {
    let distance = index - currentIndex;
    if (distance > items.length / 2) distance -= items.length;
    if (distance < -items.length / 2) distance += items.length;

    const baseTranslateX = distance * slideWidth;

    if (distance === 0) {
      return {
        transform: `translateZ(0) translateX(${baseTranslateX}px) translateY(15px) scale(1.25)`,
        zIndex: 20,
        opacity: 1,
        filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.45))",
        transition: "all 0.3s ease",
      };
    }

    if (Math.abs(distance) === 1) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-1px) scale(1)`,
        zIndex: 10,
        opacity: 1,
        filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.25))",
        transition: "all 0.3s ease",
      };
    }

    return {
      transform: `translateX(${baseTranslateX}px) translateY(-3px) scale(0.8)`,
      zIndex: 1,
      opacity: 0.4,
      filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))",
      transition: "all 0.3s ease",
    };
  };

  return (
    <div className="w-full max-w-md mx-auto relative min-h-screen">
      {/* --- Background Content Carousel --- */}
      <div
        ref={containerRef}
        className="relative z-10 h-full overflow-visible cursor-grab active:cursor-grabbing select-none pointer-events-auto"
        onMouseUp={handleBgMouseUp}
        onMouseLeave={handleBgMouseUp}
        onTouchStart={handleBgMouseDown}
        onTouchMove={handleBgMouseMove}
        onTouchEnd={handleBgMouseUp}
      >
        <div className="relative w-full min-h-screen overflow-x-hidden">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="absolute top-0 left-0 w-full h-full overflow-y-auto transition-all duration-300"
              style={{
                transform: `translateX(${(index - currentIndex) * 100 + (bgTranslateX / 400) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0,
                pointerEvents: index === currentIndex ? 'auto' : 'none',
                zIndex: index === currentIndex ? 10 : 0,
              }}
            >
              {typeof item.content === 'function' ? item.content() : item.content}
            </div>
          ))}
        </div>
      </div>

      {/* --- Icon Carousel --- */}
      <div className="bg-black fixed inset-x-0 top-0 z-20 pointer-events-none">
        <div
          className="relative z-20 overflow-visible cursor-grab active:cursor-grabbing select-none pointer-events-auto"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <div className="fixed h-34 inset-4 bg-none flex items-start justify-center overflow-x-hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
                onClick={() => handleChangeSlide(index)}
              >
                <div
                  className={`w-16 h-16 flex  overflow-hidden items-center justify-center rounded-full border-white border-1 bg-black text-white shadow-md cursor-pointer ${getSlideClass(
                    index
                  )}`}
                >
                  <h1 className="text-white  overflow-hidden font-semibold text-xs">
                    {item.icon}
                  </h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
