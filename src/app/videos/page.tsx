"use client";
import MobileCarousel from "@/components/carousels/mobile-carousel";
import { BottomNavigation } from "@/components/static/bottom-navigation";
import { Footer } from "@/components/static/footer";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { VideosGallery } from "@/components/videos/videos-gallery";
import React, { useState } from "react";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <Hero onMenuClick={() => setIsSidebarOpen(true)} />
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <VideosGallery />
        <Footer />
      </div>
      <div className="md:hidden relative min-h-[90vh] flex flex-col justify-between">
        <MobileCarousel />
        <BottomNavigation />
      </div>
    </>
  );
};

export default Page;
