"use client";

import React from "react";
import { Footer } from "@/components/static/footer";
import { ContactForm } from "@/app/static/contact/contact-form";
import { ContactBanner } from "../banners/contact-bannner";

export const SlideFour = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
      <ContactBanner />
      <ContactForm />
      <Footer />
    </div>
  );
};
