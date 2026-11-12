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
import { PRESENTATION_METADATA } from "@/data/presentationData";

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

  // Synchronize audio state
  useEffect(() => {
    setAudioActive(isAudioEnabled());
  }, []);

  // Monitor fullscreen change
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
  const slideIndexStr = String(currentSlide + 1).padStart(2, "0");
  const totalSlidesStr = String(totalSlides).padStart(2, "0");

  return (
    <>
      {/* 1. Thin Orange Progress Bar at Top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[#E8E3DD]/60">
        <motion.div
          className="h-full bg-[#FF5A1F] shadow-[0_0_8px_rgba(255,90,31,0.6)]"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
        />
      </div>

      {/* 2. Top Navigation Bar Header */}
      <header className="fixed top-3 left-0 right-0 z-40 px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Course & Topic tag */}
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="font-mono text-[11px] font-medium tracking-wider uppercase text-[#FF5A1F] bg-[#FFE9DD]/70 px-2.5 py-1 rounded-full border border-[#FF5A1F]/20">
            {PRESENTATION_METADATA.courseTitle}
          </span>
          <span className="hidden md:inline-block text-xs text-[#8A847C] font-mono">
            {currentSlide === 0 ? "Problem Statement" : "LoRa Wireless Module"}
          </span>
        </div>

        {/* Top Right Utilities: Audio toggle & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleAudioToggle}
            title={audioActive ? "Mute audio cues (M)" : "Enable audio cues (M)"}
            className="p-2 rounded-full text-[#8A847C] hover:text-[#FF5A1F] hover:bg-[#FFE9DD]/50 transition-colors interactive-hover"
            aria-label="Toggle sound"
          >
            {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={handleToggleFullscreen}
            title="Toggle fullscreen (F)"
            className="p-2 rounded-full text-[#8A847C] hover:text-[#FF5A1F] hover:bg-[#FFE9DD]/50 transition-colors interactive-hover"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* 3. Bottom Keynote Navigation Bar */}
      <footer className="fixed bottom-4 left-0 right-0 z-40 px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        {/* Left: Keyboard shortcuts hint */}
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto text-[11px] text-[#8A847C] font-mono">
          <span className="px-1.5 py-0.5 rounded border border-[#E8E3DD] bg-white/70">←</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E8E3DD] bg-white/70">→</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E8E3DD] bg-white/70">Space</span>
          <span>navigate</span>
          <span className="mx-1">•</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E8E3DD] bg-white/70">F</span>
          <span>fullscreen</span>
        </div>

        {/* Center: Slide Dot Quick Jump */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8E3DD] shadow-sm">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => onGoToSlide(idx)}
              className={`h-2 rounded-full transition-all interactive-hover ${
                idx === currentSlide
                  ? "w-6 bg-[#FF5A1F]"
                  : "w-2 bg-[#E8E3DD] hover:bg-[#FF5A1F]/40"
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Right: Counter and Prev/Next buttons */}
        <div className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8E3DD] shadow-sm">
          {/* 01 / 07 Counter */}
          <div className="font-mono text-xs font-semibold tracking-wider text-[#161412] px-1">
            <span className="text-[#FF5A1F]">{slideIndexStr}</span>
            <span className="text-[#8A847C]/60 mx-1">/</span>
            <span className="text-[#8A847C]">{totalSlidesStr}</span>
          </div>

          <div className="h-4 w-[1px] bg-[#E8E3DD]" />

          {/* Prev button */}
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className={`p-1 rounded-full transition-all interactive-hover ${
              currentSlide === 0
                ? "text-[#B8B2A9] cursor-not-allowed opacity-40"
                : "text-[#161412] hover:text-[#FF5A1F] hover:bg-[#FFE9DD]"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className={`p-1 rounded-full transition-all interactive-hover ${
              currentSlide === totalSlides - 1
                ? "text-[#B8B2A9] cursor-not-allowed opacity-40"
                : "text-[#161412] hover:text-[#FF5A1F] hover:bg-[#FFE9DD]"
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </>
  );
};
