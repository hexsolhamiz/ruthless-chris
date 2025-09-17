"use client";
import React, { useState } from "react";
import { Home, User, Settings, Star } from "lucide-react";
// import Image from "next/image";

export default function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [bgTranslateX, setBgTranslateX] = useState(0);
  const [bgIsDragging, setBgIsDragging] = useState(false);
  const [bgStartX, setBgStartX] = useState(0);

  const items = [
    {
      icon: <Home size={28} />,
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
    },
    {
      icon: <User size={28} />,
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
    },
    {
      icon: <Settings size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
    },
    {
      icon: <Star size={28} />,
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
    },
    {
      icon: <Settings size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
    },
  ];

  // Create looped array for infinite scroll effect
  // const getLoopedItems = () => {
  //   const extendedItems = [...items, ...items, ...items]; // Triple the items for smooth looping
  //   return extendedItems;
  // };

  // const loopedItems = getLoopedItems();
  const slideWidth = 88; // 64px width + 24px margin
  const centerOffset = items.length; // Start from middle set

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

    if (translateX > threshold) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (translateX < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }

    setIsDragging(false);
    setTranslateX(0);
    setStartX(0);
  };

  // Background carousel handlers
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

    const threshold = 100; // Larger threshold for background swipe

    if (bgTranslateX > threshold) {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (bgTranslateX < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }

    setBgIsDragging(false);
    setBgTranslateX(0);
    setBgStartX(0);
  };

  const getSlideStyle = (index: number) => {
    // Calculate position relative to center
    // const actualIndex = index % items.length
    const currentPos = (currentIndex + centerOffset) % items.length;
    const slidePos = index;

    // Calculate distance from center considering looping
    let distance = slidePos - currentPos;

    // Adjust for looping wrap-around
    if (distance > items.length / 2) {
      distance -= items.length;
    } else if (distance < -items.length / 2) {
      distance += items.length;
    }

    const baseTranslateX = distance * slideWidth + translateX;

    // Active slide (center): lower and larger
    if (distance === 0) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(10px) scale(1.1)`,
        zIndex: 10,
        opacity: 1,
      };
    }
    // Adjacent slides: elevated and smaller
    else if (Math.abs(distance) === 1) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-5px) scale(0.9)`,
        zIndex: 5,
        opacity: 0.5,
      };
    }
    // Outer slides: most elevated and smallest
    else {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-10px) scale(0.8)`,
        zIndex: 1,
        opacity: Math.abs(distance) > 2 ? 0.5 : 0.8,
      };
    }
  };

  return (
    <div className="w-full h-screen max-w-md mx-auto relative">
      {/* Background Image Carousel */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleBgMouseDown}
        onMouseMove={handleBgMouseMove}
        onMouseUp={handleBgMouseUp}
        onMouseLeave={handleBgMouseUp}
        onTouchStart={handleBgMouseDown}
        onTouchMove={handleBgMouseMove}
        onTouchEnd={handleBgMouseUp}
      >
        {
          // new line added here
        }
        <div
          className="flex w-full h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${
              -currentIndex * 100 + (bgTranslateX / 400) * 100
            }%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-full h-screen bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${item.bgImage})`,
              }}
            >
              <div className="absolute inset-0"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Icon Carousel */}
      <div className="relative z-10 py-8">
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
            {items.map((item, index) => (
              <div
                key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-white border-1  text-white shadow-md cursor-pointer`}
                  style={{backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover'}}
                >
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
