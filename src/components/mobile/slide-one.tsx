"use client";

import { useState } from "react";
import { Footer } from "../static/footer";
import { MusicMadness } from "../music/music-madness";
import Sponsers from "../sponsers/sponsers";
import MobileCta from "../static/mobile-cta";
import { Hero } from "../static/hero";

export const SlideOne = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
   <div className="min-w-full h-fit-content">
      
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <MusicMadness />
      <Sponsers />
      <MobileCta />
      <Footer />
    </div>
  );
};
