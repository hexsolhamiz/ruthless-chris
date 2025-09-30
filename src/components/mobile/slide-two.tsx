"use client";
import { Footer } from "@/components/static/footer";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { LiveStream } from "@/components/static/live-stream";
import React, { useState } from "react";

export const SlideTwo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <LiveStream videoUrl="https://www.youtube.com/embed/36YnV9STBqc?si=z59ATHulfbim8waW" />
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Footer />
    </div>
  );
};
