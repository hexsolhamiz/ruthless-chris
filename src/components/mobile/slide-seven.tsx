"use client";

import React from "react";
import { Footer } from "@/components/static/footer";
import {BookingForm} from "@/components/static/booking/booking-form";
import { ContactBanner } from "../banners/contact-bannner";

export const SlideSeven = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
      <ContactBanner/>
      <BookingForm />
      <Footer />
    </div>
  );
};
