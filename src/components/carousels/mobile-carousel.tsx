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

 const extendedItems = [
  items[items.length - 5], // clone last at start
  ...items,
  items[0], // clone first at end
];

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

  const threshold = 100;

  setCurrentIndex((prev) => {
    let nextIndex = prev;

    if (bgTranslateX > threshold && prev > 0) {
      // swipe right → previous slide
      nextIndex = prev - 1;
    } else if (bgTranslateX < -threshold && prev < items.length - 1) {
      // swipe left → next slide
      nextIndex = prev + 1;
    }

    return nextIndex;
  });

  setBgIsDragging(false);
  setBgTranslateX(0);
  setBgStartX(0);
};

const getSlideStyle = (index: number) => {
  // progress = currentIndex plus fractional drag offset
  const dragOffset = (translateX + bgTranslateX / 4) / slideWidth;
  const progress = currentIndex - dragOffset;

  let distance = index - progress;

  // Wrap distance (so icons don’t jump when looping)
  if (distance > items.length / 2) {
    distance -= items.length;
  } else if (distance < -items.length / 2) {
    distance += items.length;
  }

  const baseTranslateX = distance * slideWidth;

  // Center slide
  if (Math.abs(distance) < 0.5) {
    return {
      transform: `translateX(${baseTranslateX}px) translateY(15px) scale(1.25)`,
      zIndex: 20,
      opacity: 1,
      filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.45))",
    };
  }
  // Adjacent slides
  else if (Math.abs(distance) < 1.5) {
    return {
      transform: `translateX(${baseTranslateX}px) translateY(-5px) scale(0.95)`,
      zIndex: 10,
      opacity: 0.6,
      filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.25))",
    };
  }
  // Far slides
  else {
    return {
      transform: `translateX(${baseTranslateX}px) translateY(-10px) scale(0.8)`,
      zIndex: 1,
      opacity: 0.3,
      filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.15))",
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
          {extendedItems.map((item, index) => (
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
          className="relative h-24 overflow-visible cursor-grab active:cursor-grabbing select-none"
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
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
