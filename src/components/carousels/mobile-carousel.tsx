"use client";
import React, { useEffect, useRef, useState } from "react";
import { Home, Music2, Contact, Calendar, Radio } from "lucide-react";
import { SlideOne } from "../mobile/slide-one";
import { SlideTwo } from "../mobile/slide-two";
import { SlideThree } from "../mobile/slide-three";
import { SlideFour } from "../mobile/slide-four";
import { SlideFive } from "../mobile/slide-five";
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
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const items = [
    {
      icon: <Home size={28} />,
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: <SlideOne />, // Example content
      text: "Home",
    },
    {
      icon: <Radio size={28} />,
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: <SlideTwo />,
      text: "Live",
    },

    {
      icon: <Music2 size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideThree />,
      text: "Videos",
    },
    {
      icon: <Contact size={28} />,
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: <SlideFour />,
      text: "Contact",
    },
    {
      icon: <Calendar size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideFive />,
      text: "Events",
    },
    {
      icon: <Home size={28} />,
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: <SlideOne />, // Example content
      text: "Home",
    },
    {
      icon: <Radio size={28} />,
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: <SlideTwo />,
      text: "Live",
    },

    {
      icon: <Music2 size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideThree />,
      text: "Videos",
    },
    {
      icon: <Contact size={28} />,
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: <SlideFour />,
      text: "Contact",
    },
    {
      icon: <Calendar size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideFive />,
      text: "Events",
    },
    {
      icon: <Home size={28} />,
      color: "bg-blue-500",
      bgImage: "/slides/slide1.png",
      content: <SlideOne />, // Example content
      text: "Home",
    },
    {
      icon: <Radio size={28} />,
      color: "bg-green-500",
      bgImage: "/slides/slide2.png",
      content: <SlideTwo />,
      text: "Live",
    },

    {
      icon: <Music2 size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideThree />,
      text: "Videos",
    },
    {
      icon: <Contact size={28} />,
      color: "bg-yellow-500",
      bgImage: "/slides/slide4.png",
      content: <SlideFour />,
      text: "Contact",
    },
    {
      icon: <Calendar size={28} />,
      color: "bg-red-500",
      bgImage: "/slides/slide3.png",
      content: <SlideFive />,
      text: "Events",
    },
   
  ];
  useEffect(() => {
    if (itemRefs.current[currentIndex]) {
      setContainerHeight(itemRefs.current[currentIndex]!.offsetHeight);
    }
  }, [currentIndex]);
  const slideWidth = 85;

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
    <div className="w-full  max-w-md mx-auto relative">
      {/* Background Image Carousel */}
      <div
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        // onMouseDown={handleBgMouseDown}
        // onMouseMove={handleBgMouseMove}
        onMouseUp={handleBgMouseUp}
        onMouseLeave={handleBgMouseUp}
        onTouchStart={handleBgMouseDown}
        onTouchMove={handleBgMouseMove}
        onTouchEnd={handleBgMouseUp}
      >
        <div
          style={{
            height: containerHeight,
            transition: "height 300ms ease-out",
          }}
          className="overflow-hidden"
        >
          <div
            className="flex items-start transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${
                -currentIndex * 100 + (bgTranslateX / 400) * 100
              }%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className="min-w-full"
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Icon Carousel */}
      <div className="relative z-10">
        {/* Outer: allows Y overflow (for shadows above/below) */}
        <div
          className="relative z-20 overflow-y-visible cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          // onMouseMove={handleMouseMove}
          // onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Inner: clips X only */}
          <div className="fixed h-34  inset-4 bg-none flex items-start justify-center overflow-x-hidden">
            {items.map((item, index) => (
              <div
                key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
                onClick={() => handleChangeSlide(index)}
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-white border-1 bg-black text-white shadow-md cursor-pointer ${getSlideClass(
                    index
                  )}`}
                  // style={{
                  //   backgroundImage: `url(${item.bgImage})`,
                  //   backgroundSize: "cover",
                  // }}
                >
                  <h1 className="text-white font-semibold text-xs">
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
