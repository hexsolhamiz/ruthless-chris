"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Radio, Monitor, Info, Phone, Mail, Share2, Play, Pause, Volume2 } from "lucide-react"

interface HeroProps {
  onMenuClick: () => void
}

export function Hero({ onMenuClick }: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutes default
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    // Simulate audio progress for demo
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <div className="relative min-h-[400px] bg-[url(/hero.png)] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/studio-bg.png)" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-black/60" />

      {/* Navigation Bar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 text-white">
        {/* Left Navigation */}
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-1 text-sm">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>Live</span>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <Monitor className="w-4 h-4" />
            <span>Airplay</span>
          </div>

          <div className="flex items-center space-x-1 text-sm">
            <Info className="w-4 h-4" />
            <span>Info</span>
          </div>
        </div>

        {/* Center Branding */}
        <div className="text-2xl font-bold tracking-wider">Ruthless Chris</div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>Phone</span>
          </div>

          <div className="flex items-center space-x-1">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </div>

          <div className="flex items-center space-x-1">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Animated Wave Graphics */}
       
      </div>

      {/* Audio Player Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-lg border-t border-white/10 p-6">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10 p-3 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>

          {/* Progress Bar */}
          <div className="flex-1 mx-4">
            <div className="h-2 bg-white/20 rounded-full cursor-pointer relative" onClick={handleProgressClick}>
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg"
                style={{ left: `${(currentTime / duration) * 100}%`, marginLeft: "-8px" }}
              />
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src="/placeholder-audio.mp3"
      />
    </div>
  )
}
