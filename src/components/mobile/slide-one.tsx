"use client";
import React, { useState } from "react";
import { Hero } from "../static/hero";
import { Sidebar } from "../static/sidebar";
import { Footer } from "../static/footer";
import { MusicMadness } from "../music/music-madness";
// import { LiveStream } from "../static/live-stream";
import { CtaSection } from "../static/cta-section";

export const SlideOne = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-w-full h-fit-content">
      <Hero onMenuClick={() => {}} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MusicMadness />
      {/* <LiveStream videoUrl="https://www.youtube.com/embed/36YnV9STBqc?si=z59ATHulfbim8waW" /> */}
      <CtaSection />
      <Footer />
    </div>
  );
};
