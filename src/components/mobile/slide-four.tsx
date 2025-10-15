"use client";

import React from "react";
import { Footer } from "@/components/static/footer";
import { ContactForm } from "@/app/static/contact/contact-form";
import { HomeBanner } from "../banners/home-banner";

export const SlideFour = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
      <HomeBanner />
      <ContactForm />
      <Footer />
    </div>
  );
};
