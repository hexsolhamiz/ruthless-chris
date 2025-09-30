"use client";

import React, { useState } from "react";
import { Hero } from "@/components/static/hero";
import { Sidebar } from "@/components/static/sidebar";
import { ContactForm } from "../static/contact/contact-form";
import { Footer } from "@/components/static/footer";
const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      <Hero onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Page;
