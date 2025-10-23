"use client";

import React from "react";
import { Footer } from "@/components/static/footer";
import {BookingForm} from "@/components/static/booking/booking-form";
import { HomeBanner } from "../banners/home-banner";

export const SlideSeven = () => {

  return (    
    <div className="min-w-full flex flex-col items-center justify-center">
      <HomeBanner />
      <BookingForm />
      <Footer />
    </div>
  );
};
