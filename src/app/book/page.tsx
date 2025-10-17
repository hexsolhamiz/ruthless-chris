"use client";

import React, { useState } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { Footer } from "@/components/static/footer";
import { BookingForm } from "@/components/static/booking/booking-form";

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Page;
