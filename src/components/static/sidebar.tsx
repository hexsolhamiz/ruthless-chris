"use client";

import { Button } from "@/components/ui/button";
import { Radio, Monitor, Info, Phone, Mail, Share2, X } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-black/90 backdrop-blur-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b  border-white/10">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5 " />
          </Button>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-white space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Radio className="w-5 h-5 text-cyan-400" />
              <span>Live Stream</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Monitor className="w-5 h-5" />
              <span>Airplay</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Info className="w-5 h-5" />
              <span>Information</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Phone className="w-5 h-5" />
              <span>Contact</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}
    </>
  );
}
