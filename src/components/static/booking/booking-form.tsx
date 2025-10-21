"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, date, file });
    setFormData({ name: "", phone: "", email: "", message: "" });
    setDate(undefined);
    setFile(null);
  };

  return (
    <div className="bg-black w-full min-h-[500px] flex flex-col justify-start">
      <div className="w-full px-2 lg:px-0 max-w-7xl mx-auto flex flex-col items-center py-4">
        <h1 className="text-3xl font-bold text-center text-white">
          Bookings
        </h1>
        <p className="text-white text-center">
          Schedule your session — we’ll confirm your booking as soon as
          possible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-7xl mx-auto w-full px-2 lg:px-0"
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent border font-light placeholder:font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:border-primary focus:ring-primary"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border font-light placeholder:font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Phone + Booking Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent border font-light placeholder:font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:border-primary focus:ring-primary"
          />

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-light bg-transparent border border-white text-white rounded-full px-6 py-6 hover:bg-white/10"
              >
                <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-white/70">Select booking date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white text-black rounded-xl shadow-lg">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Message */}
        <Textarea
          name="message"
          placeholder="Tell us about your booking or special requirements."
          value={formData.message}
          onChange={handleChange}
          className="bg-transparent border font-light placeholder:font-light border-white rounded-3xl px-6 py-4 min-h-[150px] text-white placeholder:text-white focus:border-primary focus:ring-primary"
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-pink-500 text-white hover:cursor-pointer rounded-full py-6 font-light"
        >
          Book Now
        </Button>
      </form>
    </div>
  );
};
