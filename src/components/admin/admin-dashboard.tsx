"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LiveStreamManager } from "./live-stream-manager";
import { VideoManager } from "./video-manager";
import { ScheduleManager } from "./schedule-manager";
import { ImageManager } from "./image-manager";
import { Radio, Video, Calendar, Settings, LogOut, ImageIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export function AdminDashboard() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <div className="container w-full max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <Settings className="text-white h-8 w-8" />
          <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
        </div>
        <p className="text-white text-center">
          Manage your live stream, video content, schedules, and images
        </p>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger
            value="live"
            className="flex items-center gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">Live Stream</span>
          </TabsTrigger>

          <TabsTrigger
            value="videos"
            className="flex items-center gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>

          <TabsTrigger
            value="schedule"
            className="flex items-center gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>

          <TabsTrigger
            value="images"
            className="flex items-center gap-2 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Images</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live">
          <LiveStreamManager />
        </TabsContent>

        <TabsContent value="videos">
          <VideoManager />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleManager />
        </TabsContent>

        <TabsContent value="images">
          <ImageManager />
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white transition 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
          `}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
              ></path>
            </svg>
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}