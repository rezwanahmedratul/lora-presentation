"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AmbientBackgroundProps {
  currentSlide: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ currentSlide }) => {
  const shouldReduceMotion = useReducedMotion();

  // Subtle coordinate shifts based on active slide for organic ambient feel
  const blobVariants = {
    0: { x: [0, 40, -30, 0], y: [0, -40, 20, 0] },
    1: { x: [-30, 20, 40, -30], y: [20, -30, -20, 20] },
    2: { x: [30, -40, 20, 30], y: [-20, 30, -40, -20] },
    3: { x: [20, -30, 30, 20], y: [40, -20, 20, 40] },
    4: { x: [-40, 30, -20, -40], y: [-30, 20, 30, -30] },
    5: { x: [10, 40, -30, 10], y: [-40, 10, 30, -40] },
    6: { x: [0, -30, 40, 0], y: [30, -30, 10, 30] },
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FAF8F5]">
      {/* Precision grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Floating Orange Ambient Blob 1 (Top Right) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : (blobVariants[currentSlide as keyof typeof blobVariants] || blobVariants[0])
        }
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#FFE9DD] via-[#FF5A1F]/10 to-transparent blur-[120px] opacity-70"
      />

      {/* Floating Ambient Blob 2 (Bottom Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -35, 25, 0],
                y: [0, 30, -25, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#FFE9DD]/80 via-[#FF5A1F]/8 to-transparent blur-[140px] opacity-60"
      />

      {/* Subtle Central Warmth Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[900px] rounded-full bg-radial from-[#FFE9DD]/20 to-transparent blur-[100px] pointer-events-none" />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
