"use client";

import { useState } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import FloatingCarousel from "@/components/carousels/floating-carousel";

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
      </div>
      <div className="md:hidden block">
        <FloatingCarousel />
      </div>
    </>
  );
}
