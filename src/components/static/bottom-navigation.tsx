"use client";

import { useState, useRef } from "react";
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
  Volume2,
  VolumeX,
} from "lucide-react";

const navigationItems = [
  { id: "live", icon: Wifi, label: "Live" },
  { id: "display", icon: Monitor, label: "Display" },
  { id: "info", icon: Info, label: "Info" },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "email", icon: Mail, label: "Email" },
  { id: "share", icon: Share2, label: "Share" },
];

export function BottomNavigation() {
  const [activeItem, setActiveItem] = useState("live");
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Safari blocked playback:", err);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      if (newVolume > 0) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <nav className="sticky bottom-0 w-full bg-blue-950/30 backdrop-blur-2xl z-50">
      <div className="px-4 py-3">

        {/* SAFARI-FRIENDLY AUDIO SETUP */}
        <audio
          ref={audioRef}
          playsInline
          preload="none"
          crossOrigin="anonymous"
        >
          <source
            src="https://hello.citrus3.com:8022/stream"
            type="audio/mpeg"
          />
        </audio>

        <div className="flex items-center gap-3">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </button>

          {/* LIVE Indicator */}
          <span className="text-xs text-white bg-red-600 px-2 py-0.5 rounded-md">
            LIVE
          </span>

          {/* Volume */}
          <button onClick={toggleMute} className="text-white">
            {isMuted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-primary
            "
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors rounded-md",
                "hover:bg-accent text-white"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
