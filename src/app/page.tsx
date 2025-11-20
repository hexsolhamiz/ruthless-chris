"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { BottomNavigation } from "@/components/static/bottom-navigation";
import { MusicMadness } from "@/components/music/music-madness";
import { LiveStream } from "@/components/static/live-stream";
import { Footer } from "@/components/static/footer";
import MobileCarousel from "@/components/carousels/mobile-carousel";
import { CtaSection } from "@/components/static/cta-section";
import Sponsers from "@/components/sponsers/sponsers";

export default function RuthlessChrisPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [carouselReady, setCarouselReady] = useState(false);

  useEffect(() => {
    // Small delay ensures browser finishes "loading" state before heavy carousel mounts
    const timer = setTimeout(() => {
      setCarouselReady(true);
    }, 3000); // 300ms delay – safe and smooth

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block bg-black">
        <Hero onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MusicMadness />
        <LiveStream />
        <Sponsers />
        <CtaSection />
        <Footer />
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden bg-black relative flex flex-col justify-between">
        
        {/* 🚀 Lazy-loaded carousel — WILL NOT block page load */}
        {carouselReady ? (
          <MobileCarousel />
        ) : (
          <div className="w-full h-[40vh] flex items-center justify-center text-white opacity-40">
            {/* Optional temporary fallback */}
          </div>
        )}

        <BottomNavigation />
      </div>
    </>
  );
}
