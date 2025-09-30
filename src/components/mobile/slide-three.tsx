"use client";
import { Footer } from "@/components/static/footer";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { VideosGallery } from "@/components/videos/videos-gallery";
import React, { useState } from "react";

export const SlideThree = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-w-full  flex flex-col items-center justify-center">
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <VideosGallery />
      <Footer />
    </div>
  );
};
