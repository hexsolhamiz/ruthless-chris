"use client"
import { Footer } from "@/components/static/footer";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { LiveStream } from "@/components/static/live-stream";
import React, { useState } from "react";

const Page = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  return (
    <div>
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <LiveStream videoUrl="https://www.youtube.com/embed/36YnV9STBqc?si=z59ATHulfbim8waW" /> 
      <Footer />
    </div>
  );
};

export default Page;
