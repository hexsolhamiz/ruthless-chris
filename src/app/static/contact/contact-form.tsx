"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ ...formData, file });
    // Reset form after submission
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    setFile(null);
  };
  
  return (
    <div className="bg-black w-full min-h-[500px] flex flex-col justify-start">
        <div className="w-full px-2 lg:px-0 max-w-7xl mx-auto flex flex-col items-center py-4">
            <h1 className="text-3xl font-bold text-center text-white">Contact Us - Have a song request, shoutout, or feedback?</h1>
            <p className="text-white text-center">We&apos;d love to hear from you—reach out and let your voice be part of the show!</p>
        </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-7xl mx-auto w-full px-2 lg:px-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border font-light placeholder:font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:primary focus:ring-primary placeholder:font-light"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="relative w-full lg:w-[650px]">
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, subject: value }))
                  }
                >
                  <SelectTrigger className="w-full bg-transparent border border-white rounded-full px-6 py-6 text-white font-light placeholder:text-white focus:priamry focus:ring-purple-500">
                    <SelectValue
                      placeholder="Subject/Topic"
                      className="font-light text-white"
                    />
                  </SelectTrigger>
                  <SelectContent className="  text-white  bg-white/10 border-white">
                    <SelectItem value="events" className="font-light">
                      Events
                    </SelectItem>
                    <SelectItem value="live" className="font-light">
                      Live Stream
                    </SelectItem>
                    <SelectItem value="feedback" className="font-light">
                      Feedback
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border font-light placeholder:font-light border-white rounded-full px-6 py-6 text-white placeholder:text-white focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <Textarea
            name="message"
            placeholder="Write Message/Purpose Here."
            value={formData.message}
            onChange={handleChange}
            className="bg-transparent border font-light placeholder:font-light border-white rounded-3xl px-6 py-4 min-h-[150px] text-white placeholder:text-white focus:primary focus:ring-primary"
          />
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-pink-500 text-white hover:cursor-pointer rounded-full py-6 font-light"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};
