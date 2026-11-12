"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slide1 } from "@/components/slides/Slide1";
import { Slide2 } from "@/components/slides/Slide2";
import { Slide3 } from "@/components/slides/Slide3";
import { Slide4 } from "@/components/slides/Slide4";
import { Slide5 } from "@/components/slides/Slide5";
import { Slide6 } from "@/components/slides/Slide6";
import { Slide7 } from "@/components/slides/Slide7";
import { NavigationControls } from "@/components/ui/NavigationControls";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { PRESENTATION_METADATA } from "@/data/presentationData";
import { playSlideTransitionSound } from "@/utils/audio";

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalSlides = PRESENTATION_METADATA.totalSlides;

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides && index !== currentSlide) {
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
        playSlideTransitionSound();
      }
    },
    [currentSlide, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
      playSlideTransitionSound();
    }
  }, [currentSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
      playSlideTransitionSound();
    }
  }, [currentSlide]);

  // Global Keyboard Navigation (Arrow keys, Space, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } else if (e.key >= "1" && e.key <= "7") {
        goToSlide(Number(e.key) - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide]);

  // Mobile / Tablet Touch Swipe Detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Minimum swipe threshold (50px)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Cinematic Slide Transition Variants (Apple Keynote style: fade + slight scale + vertical drift + blur-to-sharp)
  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 32 : -32,
      scale: 0.98,
      filter: "blur(6px)",
    }),
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -32 : 32,
      scale: 0.98,
      filter: "blur(6px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden bg-[#FAF8F5] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Custom Interactive Cursor */}
      <CustomCursor />

      {/* 2. Keynote Ambient Organic Motion Background */}
      <AmbientBackground currentSlide={currentSlide} />

      {/* 3. Sticky Top & Bottom Controls (Progress bar, counters, navigation buttons) */}
      <NavigationControls
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onGoToSlide={goToSlide}
      />

      {/* 4. Fullscreen Slide Stage (Exactly 1 visible at a time) */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            {currentSlide === 0 && <Slide1 onNextSlide={nextSlide} />}
            {currentSlide === 1 && <Slide2 onNextSlide={nextSlide} />}
            {currentSlide === 2 && <Slide3 onNextSlide={nextSlide} />}
            {currentSlide === 3 && <Slide4 onNextSlide={nextSlide} />}
            {currentSlide === 4 && <Slide5 onNextSlide={nextSlide} />}
            {currentSlide === 5 && <Slide6 onNextSlide={nextSlide} />}
            {currentSlide === 6 && (
              <Slide7 onRestartPresentation={() => goToSlide(0)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
