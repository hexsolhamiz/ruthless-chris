"use client";
import React, { useEffect, useRef, useState } from "react";
import { items } from "@/data/slides";
import Link from "next/link";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Carousel component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center">
            <p className="text-red-500 mb-2">Something went wrong</p>
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function MobileCarouselInner() {
  const [currentIndex, setCurrentIndex] = useState(9);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [bgTranslateX, setBgTranslateX] = useState(0);
  const [bgIsDragging, setBgIsDragging] = useState(false);
  const [bgStartX, setBgStartX] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    translateX: 0,
    bgIsDragging: false,
    bgStartX: 0,
    bgTranslateX: 0,
    currentIndex: 8,
  });

  useEffect(() => {
    stateRef.current = {
      isDragging,
      startX,
      translateX,
      bgIsDragging,
      bgStartX,
      bgTranslateX,
      currentIndex,
    };
  }, [isDragging, startX, translateX, bgIsDragging, bgStartX, bgTranslateX, currentIndex]);

  const slideWidth = 85;

  // Cleanup function for refs
  useEffect(() => {
    return () => {
      itemRefs.current = [];
    };
  }, []);

  useEffect(() => {
    const currentItem = itemRefs.current[currentIndex];
    if (currentItem) {
      currentItem.scrollTop = 0;
    }
  }, [currentIndex]);

  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  //   setIsDragging(true);
  //   const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
  //   setStartX(clientX);
  // };

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  //   if (!isDragging) return;
  //   const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
  //   const deltaX = clientX - startX;
  //   setTranslateX(deltaX);
  // };

  // const handleMouseUp = () => {
  //   if (!isDragging) return;
  //   const threshold = slideWidth / 3;
  //   let nextIndex = currentIndex;
  //   if (translateX > threshold) {
  //     nextIndex = (currentIndex - 1 + items.length) % items.length;
  //   } else if (translateX < -threshold) {
  //     nextIndex = (currentIndex + 1) % items.length;
  //   }
  //   if (nextIndex !== currentIndex) {
  //     handleChangeSlide(nextIndex);
  //   }
  //   setIsDragging(false);
  //   setTranslateX(0);
  //   setStartX(0);
  // };

  const handleBgMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setBgIsDragging(true);
    const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
    setBgStartX(clientX);
  };

  // const handleBgMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
  //   if (!bgIsDragging) return;
  //   const clientX = "clientX" in e ? e.clientX : e.touches[0]?.clientX || 0;
  //   const deltaX = clientX - bgStartX;
  //   setBgTranslateX(deltaX);
  // };

  // const handleBgMouseUp = () => {
  //   if (!bgIsDragging) return;
  //   const threshold = 100;
  //   let nextIndex = currentIndex;
  //   if (bgTranslateX > threshold && currentIndex > 0) {
  //     nextIndex = currentIndex - 1;
  //   } else if (bgTranslateX < -threshold && currentIndex < items.length - 1) {
  //     nextIndex = currentIndex + 1;
  //   }
  //   if (nextIndex !== currentIndex) {
  //     handleChangeSlide(nextIndex);
  //   }
  //   setBgIsDragging(false);
  //   setBgTranslateX(0);
  //   setBgStartX(0);
  // };

  const handleChangeSlide = (newIndex: number) => {
    setPrevIndex(currentIndex);
    setCurrentIndex(newIndex);
  };

  const getSlideClass = (index: number): string => {
    if (index === currentIndex) {
      return "z-20 scale-100 translate-y-1 opacity-100 shadow-xl transition-all duration-300";
    }
    if (index === prevIndex) {
      return "z-10 scale-80 opacity-90 translate-y-0 transition-all duration-300";
    }
    return "z-0 scale-90 opacity-90 translate-y-0 transition-all duration-300";
  };

  const getSlideStyle = (index: number): React.CSSProperties => {
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

  // Add global event listeners with proper cleanup - FIX FOR MEMORY LEAKS
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent | TouchEvent) => {
      const state = stateRef.current;
      
      if (state.isDragging) {
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || 0;
        const deltaX = clientX - state.startX;
        setTranslateX(deltaX);
      }
    };

    const handleGlobalMouseUp = () => {
      const state = stateRef.current;
      
      if (state.isDragging) {
        const threshold = slideWidth / 3;
        let nextIndex = state.currentIndex;
        
        if (state.translateX > threshold) {
          nextIndex = (state.currentIndex - 1 + items.length) % items.length;
        } else if (state.translateX < -threshold) {
          nextIndex = (state.currentIndex + 1) % items.length;
        }
        
        if (nextIndex !== state.currentIndex) {
          setPrevIndex(state.currentIndex);
          setCurrentIndex(nextIndex);
        }
        
        setIsDragging(false);
        setTranslateX(0);
        setStartX(0);
      }
    };

    const handleGlobalBgMouseMove = (e: MouseEvent | TouchEvent) => {
      const state = stateRef.current;
      
      if (state.bgIsDragging) {
        const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || 0;
        const deltaX = clientX - state.bgStartX;
        setBgTranslateX(deltaX);
      }
    };

    const handleGlobalBgMouseUp = () => {
      const state = stateRef.current;
      
      if (state.bgIsDragging) {
        const threshold = 100;
        let nextIndex = state.currentIndex;
        
        if (state.bgTranslateX > threshold && state.currentIndex > 0) {
          nextIndex = state.currentIndex - 1;
        } else if (state.bgTranslateX < -threshold && state.currentIndex < items.length - 1) {
          nextIndex = state.currentIndex + 1;
        }
        
        if (nextIndex !== state.currentIndex) {
          setPrevIndex(state.currentIndex);
          setCurrentIndex(nextIndex);
        }
        
        setBgIsDragging(false);
        setBgTranslateX(0);
        setBgStartX(0);
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchmove", handleGlobalMouseMove, { passive: false });
    document.addEventListener("touchend", handleGlobalMouseUp);
    document.addEventListener("mousemove", handleGlobalBgMouseMove);
    document.addEventListener("mouseup", handleGlobalBgMouseUp);
    document.addEventListener("touchmove", handleGlobalBgMouseMove, { passive: false });
    document.addEventListener("touchend", handleGlobalBgMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalMouseMove);
      document.removeEventListener("touchend", handleGlobalMouseUp);
      document.removeEventListener("mousemove", handleGlobalBgMouseMove);
      document.removeEventListener("mouseup", handleGlobalBgMouseUp);
      document.removeEventListener("touchmove", handleGlobalBgMouseMove);
      document.removeEventListener("touchend", handleGlobalBgMouseUp);
    };
  }, []); 

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={handleBgMouseDown}
        onTouchStart={handleBgMouseDown}
      >
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
            <ErrorBoundary>
              {typeof item.content === 'function' ? item.content() : item.content}
            </ErrorBoundary>
          </div>
        ))}
      </div>

       <div className="fixed z-50 h-34 inset-4 bg-none flex items-start justify-center overflow-x-hidden">
            {items.map((item, index) => (
             item.link ? (
                        
             <div
                          key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
                onClick={() => handleChangeSlide(index)}
              >
                <Link 
             href={item.link}
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
                              </Link>

              </div>
             ) : (
             <div
             key={index}
                className="absolute transition-all duration-300 ease-out"
                style={getSlideStyle(index)}
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
             )
            ))}
          </div>
    </div>
  );
}

export default function MobileCarousel() {
  return (
    <ErrorBoundary>
      <MobileCarouselInner />
    </ErrorBoundary>
  );
}