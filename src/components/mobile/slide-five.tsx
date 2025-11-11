"use client";
import { Events } from "@/components/events/events";
import { Footer } from "@/components/static/footer";
import React  from "react";
import { EventBanner } from "../banners/event-banner";
export const SlideFive = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
      <EventBanner />
      <Events />
      <Footer />
    </div>
  );
};

