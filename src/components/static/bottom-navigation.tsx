"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Wifi,
  Monitor,
  Info,
  Phone,
  Mail,
  Share2,
  Play,
  Pause,
  // Volume2,
  // VolumeX,
} from "lucide-react";

const navigationItems = [
  { id: "live", icon: Wifi, label: "live" },
  { id: "display", icon: Monitor, label: "Display" },
  { id: "info", icon: Info, label: "Info" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "share", icon: Share2, label: "Share" },
];

export function BottomNavigation() {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // const toggleMute = () => {
  //   if (audioRef.current) {
  //     audioRef.current.muted = !isMuted;
  //     setIsMuted(!isMuted);
  //   }
  // };

  return (
    <nav className="sticky bottom-0 w-full overflow-hidden right-0 bg-blue-950/30 backdrop-blur-2xl z-50">
      <div className="px-4 py-3">
        <audio ref={audioRef} preload="none">
          <source
            src="https://hello.citrus3.com:8022/stream"
            type="audio/mpeg"
          />
        </audio>

        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="text-white h-4 w-4 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              // onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors",
                "hover:bg-accent text-white rounded-md"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
