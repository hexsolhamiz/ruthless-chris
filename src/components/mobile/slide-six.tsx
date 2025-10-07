"use client";
import { Footer } from "@/components/static/footer";
import React  from "react";
import { BookingsBanner } from "../banners/bookings-banner";
import ScheduleTable from "../bookings/schedule-table";

export const SlideSix = () => {

  return (
    <div className="min-w-full  flex flex-col items-center justify-center">
      <BookingsBanner />
      <ScheduleTable />
       <Footer />
    </div>  
  );
};
 