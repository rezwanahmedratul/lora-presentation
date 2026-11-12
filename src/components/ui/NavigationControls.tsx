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
  onGoToSlide: (index: number) => void;
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

      {/* 2. Top-Right Utilities Only (Audio Mute + Fullscreen Toggle) */}
      <header className="fixed top-4 right-6 sm:right-10 z-40 flex items-center gap-2 pointer-events-auto">
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

      {/* 3. Centered Floating Pill Dock (Arrows + Dots Only) */}
      <footer className="fixed bottom-5 left-0 right-0 z-40 flex items-center justify-center pointer-events-none px-6">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E2EBF5] shadow-xs">
          {/* Previous Arrow */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className={`p-1.5 rounded-full transition-all interactive-hover ${
              currentSlide === 0
                ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
                : "text-[#0F172A] hover:text-[#0071E3] hover:bg-[#E0F2FE]"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 px-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => onGoToSlide(idx)}
                className={`h-2 rounded-full transition-all interactive-hover ${
                  idx === currentSlide
                    ? "w-6 bg-[#0071E3]"
                    : "w-2 bg-[#CBD5E1] hover:bg-[#0071E3]/40"
                }`}
                aria-label={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className={`p-1.5 rounded-full transition-all interactive-hover ${
              currentSlide === totalSlides - 1
                ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
                : "text-[#0F172A] hover:text-[#0071E3] hover:bg-[#E0F2FE]"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </>
  );
};
