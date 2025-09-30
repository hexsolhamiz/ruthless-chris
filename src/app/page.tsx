"use client";

import { useState } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { BottomNavigation } from "@/components/static/bottom-navigation";
import { MusicMadness } from "@/components/music/music-madness";
import { LiveStream } from "@/components/static/live-stream";
import { Footer } from "@/components/static/footer";
import MobileCarousel from "@/components/carousels/mobile-carousel";
import { CtaSection } from "@/components/static/cta-section";

export default function RuthlessChrisPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block ">
        <Hero onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MusicMadness />
        {/* <MusicShowCarousel  /> */}
        <LiveStream videoUrl="https://www.youtube.com/embed/36YnV9STBqc?si=z59ATHulfbim8waW" />
        <CtaSection />
        <Footer />
      </div>
      <div className="md:hidden relative flex flex-col justify-between">
        <MobileCarousel />
        <BottomNavigation />
      </div>
    </>
  );
}
