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
  const slideIndexStr = String(currentSlide + 1).padStart(2, "0");
  const totalSlidesStr = String(totalSlides).padStart(2, "0");

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

      {/* 2. Top Header Navigation */}
      <header className="fixed top-3 left-0 right-0 z-40 px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-[#0071E3] bg-[#E0F2FE]/80 px-3 py-1 rounded-full border border-[#0071E3]/20">
            {PRESENTATION_METADATA.courseTitle}
          </span>
          <span className="hidden md:inline-block text-xs text-[#64748B] font-mono">
            {currentSlide === 0 ? "The Scenario" : "LoRa Wireless Module"}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={handleAudioToggle}
            title={audioActive ? "Mute audio (M)" : "Enable audio (M)"}
            className="p-2 rounded-full text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60 transition-colors interactive-hover"
            aria-label="Toggle sound"
          >
            {audioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={handleToggleFullscreen}
            title="Toggle fullscreen (F)"
            className="p-2 rounded-full text-[#64748B] hover:text-[#0071E3] hover:bg-[#E0F2FE]/60 transition-colors interactive-hover"
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* 3. Bottom Keynote Bar */}
      <footer className="fixed bottom-4 left-0 right-0 z-40 px-6 sm:px-10 flex items-center justify-between pointer-events-none">
        <div className="hidden lg:flex items-center gap-2 pointer-events-auto text-[11px] text-[#64748B] font-mono">
          <span className="px-1.5 py-0.5 rounded border border-[#E2EBF2] bg-white/80">←</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E2EBF2] bg-white/80">→</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E2EBF2] bg-white/80">Space</span>
          <span>navigate</span>
          <span className="mx-1">•</span>
          <span className="px-1.5 py-0.5 rounded border border-[#E2EBF2] bg-white/80">F</span>
          <span>fullscreen</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E2EBF2] shadow-xs">
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

        <div className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E2EBF2] shadow-xs">
          <div className="font-mono text-xs font-semibold tracking-wider text-[#0F172A] px-1">
            <span className="text-[#0071E3]">{slideIndexStr}</span>
            <span className="text-[#94A3B8] mx-1">/</span>
            <span className="text-[#64748B]">{totalSlidesStr}</span>
          </div>

          <div className="h-4 w-[1px] bg-[#E2EBF2]" />

          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className={`p-1 rounded-full transition-all interactive-hover ${
              currentSlide === 0
                ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
                : "text-[#0F172A] hover:text-[#0071E3] hover:bg-[#E0F2FE]"
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className={`p-1 rounded-full transition-all interactive-hover ${
              currentSlide === totalSlides - 1
                ? "text-[#CBD5E1] cursor-not-allowed opacity-40"
                : "text-[#0F172A] hover:text-[#0071E3] hover:bg-[#E0F2FE]"
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
