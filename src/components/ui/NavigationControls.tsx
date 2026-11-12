"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toggleAudio, isAudioEnabled, playSlideTransitionSound } from "@/utils/audio";

interface NavigationControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide?: (index: number) => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoToSlide,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioActive, setAudioActive] = useState(true);

  useEffect(() => {
    setAudioActive(isAudioEnabled());
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleAudioToggle = () => {
    const state = toggleAudio();
    setAudioActive(state);
    if (state) {
      playSlideTransitionSound();
    }
  };

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <>
      {/* 1. Thin Blue Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#E2EBF2]">
        <motion.div
          className="h-full bg-[#0071E3] shadow-[0_0_10px_rgba(0,113,227,0.5)]"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
        />
      </div>

      {/* 2. Top-Right Controls (Prev/Next Navigation + Audio + Fullscreen) */}
      <header className="fixed top-4 right-6 sm:right-10 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          title="Previous slide"
          className={`p-2 rounded-full bg-white/70 backdrop-blur-md border border-[#E2EBF5] transition-colors interactive-hover shadow-xs ${
            currentSlide === 0
              ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
              : "text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          title="Next slide"
          className={`p-2 rounded-full bg-white/70 backdrop-blur-md border border-[#E2EBF5] transition-colors interactive-hover shadow-xs ${
            currentSlide === totalSlides - 1
              ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
              : "text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>

        <div className="h-4 w-[1px] bg-[#E2EBF5] mx-0.5" />

        <button
          onClick={handleAudioToggle}
          title={audioActive ? "Mute audio" : "Enable audio"}
          className="p-2 rounded-full text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60 bg-white/70 backdrop-blur-md border border-[#E2EBF5] transition-colors interactive-hover shadow-xs"
          aria-label="Toggle sound"
        >
          {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>

        <button
          onClick={handleToggleFullscreen}
          title="Toggle fullscreen"
          className="p-2 rounded-full text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60 bg-white/70 backdrop-blur-md border border-[#E2EBF5] transition-colors interactive-hover shadow-xs"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </header>
    </>
  );
};
