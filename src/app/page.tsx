"use client";

import { useState } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import FloatingCarousel from "@/components/carousels/floating-carousel";
import { BottomNavigation } from "@/components/static/bottom-navigation";
import { MusicMadness } from "@/components/music/music-madness";
import MusicShowCarousel from "@/components/carousels/music-show-carousel";
import { LiveStream } from "@/components/static/live-stream";
import { Footer } from "@/components/static/footer";

export default function RuthlessChrisPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <Hero onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <MusicMadness />
        <MusicShowCarousel  />
        <LiveStream videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        <Footer />
      </div>
      <div className="md:hidden block">
        <FloatingCarousel />
        <BottomNavigation />
        <Footer/>
      </div>
    </>
  );
}
