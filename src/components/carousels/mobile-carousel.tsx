"use client";
import React, { useState } from "react";
import { Home, User, Settings, Star } from "lucide-react";
// import Image from "next/image";

export default function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  //  const extendedItems = [
  //   items[items.length - 1], // clone last at start
  //   ...items,
  //   items[0], // clone first at end
  // ];
  // const extendedItems = [items[items.length - 1], ...items, items[0]];

  // const loopedItems = getLoopedItems();
  const slideWidth = 85; // 64px width + 24px margin
  // const centerOffset = items.length; // Start from middle set

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
      handleChangeSlide(nextIndex); // 👈 use new handler
    }
    setIsTransitioning(true);
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

    const threshold = 100;
    let nextIndex = currentIndex;

    if (bgTranslateX > threshold && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (bgTranslateX < -threshold && currentIndex < items.length - 1) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== currentIndex) {
      handleChangeSlide(nextIndex); // 👈 use new handler
    }
    setIsTransitioning(true);
    setBgIsDragging(false);
    setBgTranslateX(0);
    setBgStartX(0);
  };

  const handleChangeSlide = (newIndex: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

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

    // Wrap for circular effect
    if (distance > items.length / 2) distance -= items.length;
    if (distance < -items.length / 2) distance += items.length;

    const baseTranslateX = distance * slideWidth;

    // Active icon (center)
    if (distance === 0) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(15px) scale(1.25)`,
        zIndex: 20,
        opacity: 1,
        filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.45))",
        transition: "all 0.3s ease",
      };
    }

    // Side icons
    if (Math.abs(distance) === 1) {
      return {
        transform: `translateX(${baseTranslateX}px) translateY(-1px) scale(1)`,
        zIndex: 10,
        opacity: 1,
        filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.25))",
        transition: "all 0.3s ease",
      };
    }

    // Far icons
    return {
      transform: `translateX(${baseTranslateX}px) translateY(-3px) scale(0.8)`,
      zIndex: 1,
      opacity: 0.4,
      filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))",
      transition: "all 0.3s ease",
    };
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
      <div className="relative z-10 bg-gradient-to-b from-blue-900 via-blue-950 h-34">
        {/* Outer: allows Y overflow (for shadows above/below) */}
        <div
          className="relative h-34 z-20 overflow-y-visible cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Inner: clips X only */}
          <div className="absolute inset-4 bg-none flex items-start justify-center overflow-x-hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
                onClick={() => handleChangeSlide(index)} 
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-white border-1 text-white shadow-md cursor-pointer ${getSlideClass(
                    index
                  )}`}
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
