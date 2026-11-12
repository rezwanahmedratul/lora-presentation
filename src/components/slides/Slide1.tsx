"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_1_DATA, TechFailureCard } from "@/data/presentationData";
import { playErrorSound, playSuccessSound } from "@/utils/audio";
import { ArrowRight, AlertCircle } from "lucide-react";

interface Slide1Props {
  onNextSlide: () => void;
}

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
        setTimeout(() => playSuccessSound(), 350);
      }
      return next;
    });
  };

  const allClicked =
    Object.keys(clickedTechs).length === SLIDE_1_DATA.technologies.length;

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto overflow-y-auto">
      {/* 1. Ultra Clean Minimal Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          The Problem
        </span>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#0F172A] leading-tight tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-2">
            {SLIDE_1_DATA.headlineItalic}
          </em>
          {SLIDE_1_DATA.headlineRest}
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] font-sans mt-2 max-w-2xl leading-relaxed">
          {SLIDE_1_DATA.subStory}
        </p>
      </motion.div>

      {/* 2. Visual Farm Map + 4 Compact Tech Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-2 items-center">
        {/* Farm Map (7 cols) */}
        <div className="lg:col-span-7 keynote-card p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-2 text-xs font-mono">
            <span className="text-[#0F172A] font-medium flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#0071E3] animate-pulse" />
              200-Acre Topography (50 Probes)
            </span>
            <span className="text-[#64748B]">
              {selectedTech ? `Testing: ${selectedTech.name}` : "Click a radio to test"}
            </span>
          </div>

          <div className="relative w-full aspect-[16/10] bg-[#EDF4F9] rounded-2xl border border-[#E2EBF2] overflow-hidden">
            <svg viewBox="0 0 620 420" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Field plots */}
              <rect x="20" y="20" width="270" height="180" rx="8" fill="#E2EBF2" fillOpacity="0.5" />
              <rect x="310" y="20" width="290" height="180" rx="8" fill="#E2EBF2" fillOpacity="0.4" />
              <rect x="20" y="220" width="360" height="180" rx="8" fill="#E2EBF2" fillOpacity="0.4" />
              <rect x="400" y="220" width="200" height="180" rx="8" fill="#E2EBF2" fillOpacity="0.5" />

              {/* Dirt road dividing lines */}
              <line x1="0" y1="210" x2="620" y2="210" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="300" y1="0" x2="300" y2="420" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />

              {/* 50 Sensor Probe Points */}
              {SENSOR_POINTS.map((pt, i) => {
                const dist = Math.hypot(pt.x - 40, pt.y - 40);
                const maxPixelRadius = (selectedTech?.radarRadiusScale ?? 0) * 580;
                const inRange = selectedTech && dist <= maxPixelRadius;

                return (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={inRange ? 6 : 4}
                    fill={inRange ? "#0071E3" : "#64748B"}
                    opacity={inRange ? 1 : 0.4}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* Animated Radar Circle */}
              <AnimatePresence>
                {selectedTech && (
                  <motion.circle
                    key={selectedTech.id}
                    cx="40"
                    cy="40"
                    r={selectedTech.radarRadiusScale * 580}
                    fill="#0071E3"
                    fillOpacity={selectedTech.id === "gsm" ? 0.08 : 0.16}
                    stroke="#0071E3"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ scale: 0.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                )}
              </AnimatePresence>

              {/* Central Farmhouse Hub */}
              <g transform="translate(25, 25)">
                <rect x="0" y="0" width="30" height="30" rx="6" fill="#0F172A" />
                <path d="M 5 15 L 15 5 L 25 15" stroke="#FFFFFF" strokeWidth="2" fill="none" />
                <line x1="26" y1="5" x2="26" y2="-4" stroke="#0071E3" strokeWidth="2" />
                <circle cx="26" cy="-4" r="3" fill="#0071E3" className="animate-ping" />
              </g>
              <text x="65" y="44" fontFamily="monospace" fontSize="11" fontWeight="600" fill="#0F172A">
                Farmhouse Hub
              </text>
            </svg>
          </div>
        </div>

        {/* 4 Clickable Radios (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#64748B] mb-1">
            <span>Click to test each wireless technology:</span>
            <span className="text-[#0071E3] font-semibold">{Object.keys(clickedTechs).length}/4</span>
          </div>

          {SLIDE_1_DATA.technologies.map((tech) => {
            const isSelected = selectedTech?.id === tech.id;
            const hasFailed = !!clickedTechs[tech.id];

            return (
              <button
                key={tech.id}
                onClick={() => handleTechClick(tech)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all interactive-hover ${
                  isSelected
                    ? "bg-white border-[#0071E3] shadow-md shadow-[#0071E3]/10"
                    : "bg-white/80 border-[#E2EBF2] hover:border-[#0071E3]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-sans font-semibold text-sm text-[#0F172A] flex items-center gap-2">
                      {tech.name}
                      <span className="font-mono text-xs font-normal text-[#64748B]">
                        {tech.rangeSpec}
                      </span>
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">{tech.tagline}</p>
                  </div>

                  {hasFailed ? (
                    <motion.span
                      initial={{ scale: 1.8, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1, rotate: -4, opacity: 1 }}
                      className="px-2 py-0.5 rounded border border-rose-300 bg-rose-50 text-rose-600 font-mono text-xs font-bold"
                    >
                      FAILED ✕
                    </motion.span>
                  ) : (
                    <span className="font-mono text-xs text-[#0071E3] bg-[#E0F2FE] px-2 py-0.5 rounded">
                      Test
                    </span>
                  )}
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2.5 pt-2.5 border-t border-[#E2EBF2] text-xs text-rose-600 flex items-start gap-1.5"
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{tech.failureReason}</span>
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Punchy Resolution Banner */}
      <div className="min-h-[50px] flex items-center justify-between">
        <AnimatePresence>
          {allClicked ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#E0F2FE] to-white border border-[#0071E3]/30"
            >
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#0071E3] font-bold">
                  The Requirement
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#0F172A]">
                  &ldquo;{SLIDE_1_DATA.resolutionPunchline}&rdquo;
                </p>
              </div>

              <button
                onClick={onNextSlide}
                className="shrink-0 flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#0071E3] text-white font-sans text-xs font-semibold hover:bg-[#0369A1] transition-colors interactive-hover"
              >
                <span>Reveal The Solution</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ) : (
            <p className="text-xs font-mono text-[#64748B] mx-auto text-center">
              Click all four options above to evaluate the trade-offs.
            </p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
