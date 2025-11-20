"use client";

import React, { useRef, useState } from "react";
import { items } from "@/data/slides";

export default function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Drag state refs (no React state, no re-renders)
  const dragRef = useRef({
    startX: 0,
    isDragging: false,
    translateX: 0,
    animationFrame: 0,
  });

  const bgDragRef = useRef({
    startX: 0,
    isDragging: false,
    translateX: 0,
    animationFrame: 0,
  });

  const slideWidth = 85; // icon carousel width

  // --- Slide changing logic ---
  const handleChangeSlide = (newIndex: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  // --- Animation helpers ---
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

  // --- Drag handlers for icon carousel ---
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    dragRef.current.isDragging = true;
    dragRef.current.startX = clientX;
  };

  const onDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragRef.current.isDragging) return;
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    dragRef.current.translateX = clientX - dragRef.current.startX;

    cancelAnimationFrame(dragRef.current.animationFrame);
    dragRef.current.animationFrame = requestAnimationFrame(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const style = getSlideStyle(index);
        const baseTransform = style.transform;
        const translateOffset =
          index === currentIndex ? dragRef.current.translateX : 0;
        item.style.transform = `${baseTransform} translateX(${translateOffset}px)`;
      });
    });
  };

  const endDrag = () => {
    if (!dragRef.current.isDragging) return;

    const threshold = slideWidth / 3;
    let nextIndex = currentIndex;

    if (dragRef.current.translateX > threshold) {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (dragRef.current.translateX < -threshold) {
      nextIndex = (currentIndex + 1) % items.length;
    }

    if (nextIndex !== currentIndex) handleChangeSlide(nextIndex);

    dragRef.current.isDragging = false;
    dragRef.current.translateX = 0;

    // Reset transforms after drag ends
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const style = getSlideStyle(index);
      Object.assign(item.style, style);
    });
  };

  // --- Background drag (similar approach) ---
  const startBgDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    bgDragRef.current.isDragging = true;
    bgDragRef.current.startX = clientX;
  };

  const onBgDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!bgDragRef.current.isDragging) return;
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    bgDragRef.current.translateX = clientX - bgDragRef.current.startX;

    cancelAnimationFrame(bgDragRef.current.animationFrame);
    bgDragRef.current.animationFrame = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      containerRef.current.style.transform = `translateX(${
        (bgDragRef.current.translateX / 400) * 100
      }%)`;
    });
  };

  const endBgDrag = () => {
    if (!bgDragRef.current.isDragging) return;

    const threshold = 100;
    let nextIndex = currentIndex;

    if (bgDragRef.current.translateX > threshold && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    } else if (
      bgDragRef.current.translateX < -threshold &&
      currentIndex < items.length - 1
    ) {
      nextIndex = currentIndex + 1;
    }

    if (nextIndex !== currentIndex) handleChangeSlide(nextIndex);

    bgDragRef.current.isDragging = false;
    bgDragRef.current.translateX = 0;
    if (containerRef.current) containerRef.current.style.transform = "translateX(0)";
  };

  return (
    <div className="w-full max-w-md mx-auto relative min-h-screen">
      {/* Background Carousel */}
      <div
        ref={containerRef}
        className="relative z-10 h-full overflow-visible cursor-grab active:cursor-grabbing select-none"
        onMouseDown={startBgDrag}
        onMouseMove={onBgDrag}
        onMouseUp={endBgDrag}
        onMouseLeave={endBgDrag}
        onTouchStart={startBgDrag}
        onTouchMove={onBgDrag}
        onTouchEnd={endBgDrag}
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
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                opacity: index === currentIndex ? 1 : 0,
                pointerEvents: index === currentIndex ? "auto" : "none",
                zIndex: index === currentIndex ? 10 : 0,
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Icon Carousel */}
      <div className="bg-black fixed inset-x-0 top-0 z-20 pointer-events-none">
        <div
          className="relative z-20 overflow-visible cursor-grab active:cursor-grabbing select-none"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={endDrag}
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
                  className={`w-16 h-16 flex items-center justify-center rounded-full border-white border-1 bg-black text-white shadow-md cursor-pointer`}
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
