import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { events } from "@/data/events";
import Image from "next/image";

export default function EventsCarousel() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );
  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(
    null
  );

  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: isMobile ? "y" : "x",
      loop: true,
      dragFree: true,
    },
    [Autoplay({ delay: 3000, stopOnInteraction: true })]
  );

  // Handle resize → switch axis
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit({
        axis: isMobile ? "y" : "x",
        loop: true,
        dragFree: true,
      });
    }
  }, [isMobile, emblaApi]);

  // Handle escape key for closing popup
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Carousel */}
      <div className="max-w-6xl mx-auto bg-black h-[400px] overflow-hidden" ref={emblaRef}>
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full`}>
          {events.map((event, i) => (
            <div
              key={i}
              className="lg:flex-[0_0_33%] flex-[0_0_100%] flex items-center justify-center p-6 rounded-2xl shadow-md bg-contain bg-no-repeat bg-center mx-2 cursor-pointer"
              style={{ backgroundImage: `url(${event.img})` }}
              onClick={() => setSelectedEvent(event)}
            >
              
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-4xl w-[90%] rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <Image
              src={selectedEvent.img}
              alt={selectedEvent.img}
              className="w-full h-auto object-contain"
              width={100}
              height={100}
            />
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 bg-black/70 text-white rounded-full px-3 py-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
