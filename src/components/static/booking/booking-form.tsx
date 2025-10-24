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
import { BookingTermsAndConditions } from "./booking-terms-and-conditions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timings } from "@/data/timings";

export const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    termsAccepted: false,
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
    setDate(undefined);
    setFile(null);
  };

  return (
    <div className="bg-black w-full min-h-[500px] flex flex-col justify-start">
      <div className="w-full px-2 lg:px-0 max-w-7xl mx-auto flex flex-col items-center py-4">
        <h1 className="text-3xl font-bold text-center text-white">Bookings</h1>
        <p className="text-white text-center">
          £150 Booking Fee Non Refundable,
        </p>
        {/* <p className="text-white text-center">
          Schedule your session — we&apos;ll confirm your booking as soon as
          possible.
        </p> */}
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-7xl mx-auto w-full px-2 lg:px-0 pb-8"
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
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span className="text-white/70">Select booking date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white text-black rounded-xl shadow-lg">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, subject: value }))
          }
        >
          <SelectTrigger className="w-full bg-transparewnt border border-white rounded-full px-6 py-6 text-white font-light placeholder:text-white focus:priamry focus:ring-purple-500">
            <SelectValue
              placeholder="Hiring Details"
              className="font-light text-white"
            />
          </SelectTrigger>
          <SelectContent className="  text-black  bg-white border-white">
            <SelectItem value="events" className="font-light">
              DJ Only
            </SelectItem>
            <SelectItem value="live" className="font-light">
              DJ + Equipment
            </SelectItem>
            <SelectItem value="feedback" className="font-light">
              Equipment Only
            </SelectItem>
          </SelectContent>
        </Select>

        <h2 className="text-white px-2 text-center">Venue Details</h2>

        <div className="grid  grid-cols-2 gap-2">
          <div>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, subject: value }))
              }
            >
              <SelectTrigger className="w-full bg-transparewnt border border-white rounded-full px-6 py-6 text-white font-light placeholder:text-white focus:priamry focus:ring-purple-500">
                <SelectValue
                  placeholder="Start Time"
                  className="font-light text-white"
                />
              </SelectTrigger>
              <SelectContent className="  text-black  bg-white border-white">
                {timings.map((timing) => (
                  <SelectItem value={timing} key={timing}>
                    {timing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, subject: value }))
              }
            >
              <SelectTrigger className="w-full bg-transparewnt border border-white rounded-full px-6 py-6 text-white font-light placeholder:text-white focus:priamry focus:ring-purple-500">
                <SelectValue
                  placeholder="End Time"
                  className="font-light text-white"
                />
              </SelectTrigger>
              <SelectContent className="  text-black  bg-white border-white">
                {timings.map((timing) => (
                  <SelectItem value={timing} key={timing}>
                    {timing}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="text-white px-2 text-center">Venue Location</h2>
<Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, subject: value }))
          }
        >
          <SelectTrigger className="w-full bg-transparewnt border border-white rounded-full px-6 py-6 text-white font-light placeholder:text-white focus:priamry focus:ring-purple-500">
            <SelectValue
              placeholder="Hiring Details"
              className="font-light text-white"
            />
          </SelectTrigger>
          <SelectContent className="  text-black  bg-white border-white">
            <SelectItem value="events" className="font-light">
              Ground Floor
            </SelectItem>
            <SelectItem value="live" className="font-light">
              Above Ground Floor
            </SelectItem>
            <SelectItem value="feedback" className="font-light">
              Parking Facility
            </SelectItem>
          </SelectContent>
        </Select>
        {/* Message */}
        <Textarea
          name="message"
          placeholder="Tell us about your booking or special requirements."
          value={formData.message}
          onChange={handleChange}
          className="bg-transparent border font-light placeholder:font-light border-white rounded-3xl px-6 py-4 min-h-[150px] text-white placeholder:text-white focus:border-primary focus:ring-primary"
        />

        {/* Terms and Conditions */}
        <div className="border border-white/30 rounded-3xl p-6 mt-6">
          <BookingTermsAndConditions />

          {/* Checkbox */}
          <div className="flex items-start gap-3 mt-6 pt-4 border-t border-white/20">
            <input
              type="checkbox"
              id="terms"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-1 h-5 w-5 rounded border-white/30 bg-transparent text-emerald-500 focus:ring-emerald-500 focus:ring-offset-black cursor-pointer"
              required
            />
            <label
              htmlFor="terms"
              className="text-white font-light text-sm cursor-pointer"
            >
              I have read and agree to the terms and conditions outlined above
            </label>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!formData.termsAccepted}
          className="w-full bg-gradient-to-r from-emerald-500 to-pink-500 text-white hover:cursor-pointer rounded-full py-6 font-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Book Now
        </Button>
      </form>
    </div>
  );
};
