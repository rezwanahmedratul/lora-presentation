"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_1_DATA, TechFailureCard } from "@/data/presentationData";
import { playErrorSound, playSuccessSound } from "@/utils/audio";
import { ArrowRight, BatteryCharging, Radio, DollarSign, AlertCircle } from "lucide-react";

interface Slide1Props {
  onNextSlide: () => void;
}

// Fixed pseudo-random positions for 50 farm sensor dots across a 200-acre grid (600x420)
const SENSOR_POINTS = [
  { x: 120, y: 70 }, { x: 190, y: 60 }, { x: 260, y: 80 }, { x: 340, y: 55 }, { x: 420, y: 75 }, { x: 510, y: 90 },
  { x: 90, y: 130 }, { x: 160, y: 120 }, { x: 230, y: 140 }, { x: 310, y: 125 }, { x: 390, y: 135 }, { x: 470, y: 145 }, { x: 550, y: 120 },
  { x: 140, y: 185 }, { x: 210, y: 190 }, { x: 280, y: 180 }, { x: 360, y: 195 }, { x: 440, y: 185 }, { x: 520, y: 200 },
  { x: 80, y: 240 }, { x: 170, y: 245 }, { x: 240, y: 235 }, { x: 320, y: 250 }, { x: 400, y: 240 }, { x: 490, y: 255 }, { x: 560, y: 230 },
  { x: 130, y: 295 }, { x: 200, y: 300 }, { x: 270, y: 290 }, { x: 350, y: 305 }, { x: 430, y: 295 }, { x: 510, y: 310 },
  { x: 90, y: 350 }, { x: 165, y: 360 }, { x: 245, y: 345 }, { x: 325, y: 365 }, { x: 405, y: 355 }, { x: 485, y: 370 }, { x: 555, y: 340 },
  { x: 120, y: 395 }, { x: 210, y: 405 }, { x: 290, y: 390 }, { x: 375, y: 400 }, { x: 450, y: 395 }, { x: 530, y: 385 },
  { x: 180, y: 155 }, { x: 300, y: 90 }, { x: 460, y: 105 }, { x: 260, y: 360 }, { x: 390, y: 325 }
];

export const Slide1: React.FC<Slide1Props> = ({ onNextSlide }) => {
  const [selectedTech, setSelectedTech] = useState<TechFailureCard | null>(null);
  const [clickedTechs, setClickedTechs] = useState<Record<string, boolean>>({});

  const handleTechClick = (tech: TechFailureCard) => {
    setSelectedTech(tech);
    playErrorSound();
    setClickedTechs((prev) => {
      const next = { ...prev, [tech.id]: true };
      if (Object.keys(next).length === SLIDE_1_DATA.technologies.length) {
        setTimeout(() => playSuccessSound(), 400);
      }
      return next;
    });
  };

  const allClicked =
    Object.keys(clickedTechs).length === SLIDE_1_DATA.technologies.length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] font-semibold">
          The Challenge • Field Telemetry
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#161412] leading-[1.06] tracking-tight mt-2">
          <em className="italic text-[#FF5A1F] font-normal mr-2">
            {SLIDE_1_DATA.headlineItalic}
          </em>
          {SLIDE_1_DATA.headlineRest}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[#8A847C] font-sans mt-3 max-w-3xl leading-relaxed">
          {SLIDE_1_DATA.subStory}
        </p>
      </motion.div>

      {/* 2. Main Content Grid: Farm Map + Failure Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
        {/* Farm Map (7 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-7 relative keynote-card p-4 sm:p-5 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span className="font-mono text-xs font-medium text-[#161412]">
                Farm Topography (200 Acres • 50 Active Probes)
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8A847C]">
              Scale: 1:15,000
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] bg-[#F4EFEA] rounded-2xl border border-[#E8E3DD] overflow-hidden">
            <svg
              viewBox="0 0 620 420"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Farm Field Plots Grid Pattern */}
                <pattern id="cropField1" width="30" height="30" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="15" x2="30" y2="15" stroke="#E2DACF" strokeWidth="1" strokeDasharray="2 3" />
                </pattern>
                <pattern id="cropField2" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="10" x2="20" y2="10" stroke="#DFD5C8" strokeWidth="0.8" />
                </pattern>
                {/* Range radar gradient */}
                <radialGradient id="rangeGlow" cx="50" cy="50" r="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.35" />
                  <stop offset="70%" stopColor="#FF5A1F" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Field Parcels */}
              <rect x="20" y="20" width="270" height="180" rx="12" fill="url(#cropField1)" />
              <rect x="310" y="20" width="290" height="180" rx="12" fill="url(#cropField2)" />
              <rect x="20" y="220" width="360" height="180" rx="12" fill="url(#cropField2)" />
              <rect x="400" y="220" width="200" height="180" rx="12" fill="url(#cropField1)" />

              {/* Dirt Roads / Irrigation Canal Lines */}
              <path d="M 0 210 L 620 210" stroke="#D3C7B7" strokeWidth="3" strokeDasharray="6 4" />
              <path d="M 300 0 L 300 420" stroke="#D3C7B7" strokeWidth="3" strokeDasharray="6 4" />

              {/* 50 Sensor Probe Points */}
              {SENSOR_POINTS.map((pt, i) => {
                // Check if this point falls within selected technology's range radius
                const houseX = 40;
                const houseY = 40;
                const dist = Math.hypot(pt.x - houseX, pt.y - houseY);
                const maxPixelRadius = (selectedTech?.radarRadiusScale ?? 0) * 580;
                const inRange = selectedTech && dist <= maxPixelRadius;

                return (
                  <g key={i}>
                    {/* Pulsing ring around sensors */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={inRange ? 7 : 4}
                      fill={inRange ? "#FF5A1F" : "#161412"}
                      opacity={inRange ? 0.9 : 0.4}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="10"
                      fill="none"
                      stroke={inRange ? "#FF5A1F" : "#8A847C"}
                      strokeWidth="1"
                      opacity={inRange ? 0.6 : 0.15}
                    />
                  </g>
                );
              })}

              {/* Animated Range Circle From House */}
              <AnimatePresence>
                {selectedTech && (
                  <motion.g
                    key={selectedTech.id}
                    initial={{ opacity: 0, scale: 0.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  >
                    <circle
                      cx="40"
                      cy="40"
                      r={selectedTech.radarRadiusScale * 580}
                      fill="#FF5A1F"
                      fillOpacity={selectedTech.id === "gsm" ? 0.08 : 0.18}
                      stroke="#FF5A1F"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Animated scanning pulse */}
                    <motion.circle
                      cx="40"
                      cy="40"
                      r={selectedTech.radarRadiusScale * 580}
                      fill="none"
                      stroke="#FF5A1F"
                      strokeWidth="3"
                      initial={{ scale: 0.2, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Central Farmhouse / Gateway Base */}
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="30" height="30" rx="6" fill="#161412" />
                <path d="M 5 15 L 15 5 L 25 15" stroke="#FAF8F5" strokeWidth="2" fill="none" />
                <rect x="11" y="15" width="8" height="12" fill="#FAF8F5" />
                {/* Antenna mast with small pulse */}
                <line x1="26" y1="5" x2="26" y2="-4" stroke="#FF5A1F" strokeWidth="2" />
                <circle cx="26" cy="-4" r="3" fill="#FF5A1F" className="animate-ping" />
              </g>
              <text x="65" y="44" fontFamily="monospace" fontSize="11" fontWeight="600" fill="#161412">
                Farmhouse Hub
              </text>
            </svg>

            {/* Radar telemetry badge overlay */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E8E3DD] text-[11px] font-mono text-[#161412] flex items-center gap-3">
              <span>Coverage: <strong>{selectedTech ? selectedTech.rangeSpec : "No Radio Selected"}</strong></span>
              {selectedTech && (
                <span className="text-[#C23B0A] font-semibold">
                  {selectedTech.id === "gsm" ? "50/50 reached (High $)" : `${Math.round(selectedTech.radarRadiusScale * 50)}/50 probes reached`}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* 4 Interactive Technology Failure Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A847C]">
              Evaluate Standard Radios:
            </span>
            <span className="text-[11px] font-mono text-[#FF5A1F]">
              Click all 4 ({Object.keys(clickedTechs).length}/4)
            </span>
          </div>

          {SLIDE_1_DATA.technologies.map((tech) => {
            const isSelected = selectedTech?.id === tech.id;
            const hasBeenClicked = !!clickedTechs[tech.id];

            return (
              <motion.button
                key={tech.id}
                onClick={() => handleTechClick(tech)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`relative text-left p-3.5 rounded-2xl border transition-all duration-200 overflow-hidden interactive-hover ${
                  isSelected
                    ? "bg-white border-[#FF5A1F] shadow-md shadow-[#FF5A1F]/10"
                    : hasBeenClicked
                    ? "bg-white/80 border-[#E8E3DD] opacity-80"
                    : "bg-white/90 border-[#E8E3DD] hover:border-[#FF5A1F]/40 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans font-semibold text-sm sm:text-base text-[#161412] flex items-center gap-2">
                      {tech.name}
                      <span className="text-[11px] font-mono font-normal text-[#8A847C]">
                        {tech.rangeSpec}
                      </span>
                    </h3>
                    <p className="text-xs text-[#8A847C] mt-0.5">{tech.tagline}</p>
                  </div>

                  {/* Stamp Animation when clicked */}
                  {hasBeenClicked ? (
                    <motion.div
                      initial={{ scale: 2.2, rotate: -20, opacity: 0 }}
                      animate={{ scale: 1, rotate: -8, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 15 }}
                      className="px-2 py-0.5 rounded border border-[#C23B0A] bg-[#FFE9DD] text-[#C23B0A] font-mono text-xs font-bold tracking-wider"
                    >
                      FAILED ✕
                    </motion.div>
                  ) : (
                    <span className="text-[11px] font-mono text-[#FF5A1F] bg-[#FFE9DD]/70 px-2 py-0.5 rounded">
                      Test
                    </span>
                  )}
                </div>

                {/* Expanded Failure Details when selected */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 pt-3 border-t border-[#E8E3DD]/80 text-xs text-[#161412]"
                    >
                      <div className="p-2.5 rounded-xl bg-[#FFE9DD]/40 border border-[#FF5A1F]/20 text-[#C23B0A] font-medium mb-2 flex items-start gap-1.5">
                        <AlertCircle size={15} className="shrink-0 mt-0.5" />
                        <span>{tech.failureReason}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#8A847C]">
                        <div className="flex items-center gap-1">
                          <BatteryCharging size={13} className="text-[#FF5A1F]" />
                          <span>Battery: {tech.batteryLife}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={13} className="text-[#FF5A1F]" />
                          <span>Cost: {tech.costSpec}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. Closing Resolution Banner Fades in when all 4 are tested */}
      <div className="min-h-[58px] flex items-center justify-between">
        <AnimatePresence>
          {allClicked ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFE9DD] to-white border border-[#FF5A1F]/30 shadow-sm"
            >
              <div className="text-center sm:text-left">
                <span className="font-mono text-xs uppercase tracking-wider text-[#C23B0A] font-bold">
                  The Fundamental Trilemma
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#161412] tracking-tight mt-0.5">
                  &ldquo;{SLIDE_1_DATA.resolutionPunchline}&rdquo;
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNextSlide}
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF5A1F] text-white font-sans text-sm font-medium shadow-md shadow-[#FF5A1F]/25 hover:bg-[#C23B0A] transition-colors interactive-hover"
              >
                <span>Discover The Solution</span>
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <p className="text-xs font-mono text-[#8A847C] mx-auto text-center">
              Click all four wireless technologies above to analyze why they fail the farmer.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
