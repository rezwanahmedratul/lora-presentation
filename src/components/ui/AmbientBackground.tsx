"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AmbientBackgroundProps {
  currentSlide: number;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ currentSlide }) => {
  const shouldReduceMotion = useReducedMotion();

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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F4F8FB]">
      {/* Precision light blue grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70" />

      {/* Floating Light Blue Ambient Blob 1 (Top Right) */}
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
        className="absolute -top-32 -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#E0F2FE] via-[#0071E3]/10 to-transparent blur-[120px] opacity-80"
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
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#BAE6FD]/60 via-[#0071E3]/8 to-transparent blur-[140px] opacity-70"
      />

      {/* Central Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[900px] rounded-full bg-radial from-[#E0F2FE]/40 to-transparent blur-[120px] pointer-events-none" />
    </div>
  );
};
