"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDE_1_DATA } from "@/data/presentationData";
import { playSuccessSound, playErrorSound } from "@/utils/audio";
import { ArrowRight, HelpCircle, CheckCircle2, XCircle, Radio } from "lucide-react";

interface Slide1Props {
  onNextSlide: () => void;
}

export const Slide1: React.FC<Slide1Props> = ({ onNextSlide }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSelectOption = (idx: number) => {
    setSelectedAnswer(idx);
    if (SLIDE_1_DATA.interactiveOptions[idx].correct) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between pt-12 pb-16 px-8 sm:px-14 lg:px-20 xl:px-24 overflow-y-auto">
      {/* 1. Full-Width Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#0071E3] font-semibold">
          {SLIDE_1_DATA.title}
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-[#0F172A] leading-[1.02] tracking-tight mt-1">
          <em className="italic text-[#0071E3] font-normal mr-3">Connecting Things</em>
          Wirelessly.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-[#64748B] font-sans mt-2 max-w-4xl leading-relaxed">
          The challenge of gathering data across kilometers of remote land without power cords or cell towers.
        </p>
      </motion.div>

      {/* 2. Main Body: Agriculture Field Visual (Left) + Interactive Question (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 my-auto py-2 items-center w-full">
        {/* Visual: Smart Agriculture Field SVG (7 cols) */}
        <div className="lg:col-span-7 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full">
          <div className="flex items-center justify-between mb-3 text-xs sm:text-sm font-mono text-[#0F172A]">
            <span className="font-semibold flex items-center gap-2">
              <Radio size={16} className="text-[#0071E3]" />
              Smart Agriculture Field Telemetry (2 km Distance)
            </span>
            <span className="text-[#64748B]">Zero Infrastructure</span>
          </div>

          {/* SVG Map of Smart Field with Sensors Communicating Over Long Distance */}
          <div className="relative w-full aspect-[16/9] bg-[#F4F8FC] rounded-2xl border border-[#E2EBF5] overflow-hidden p-3">
            <svg viewBox="0 0 700 360" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <rect x="20" y="20" width="310" height="150" rx="10" fill="#E2EBF5" fillOpacity="0.6" />
              <rect x="350" y="20" width="330" height="150" rx="10" fill="#E2EBF5" fillOpacity="0.4" />
              <rect x="20" y="190" width="420" height="150" rx="10" fill="#E2EBF5" fillOpacity="0.4" />
              <rect x="460" y="190" width="220" height="150" rx="10" fill="#E2EBF5" fillOpacity="0.6" />

              <line x1="0" y1="180" x2="700" y2="180" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6 4" />
              <line x1="340" y1="0" x2="340" y2="360" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="6 4" />

              {/* Base Station */}
              <g transform="translate(40, 40)">
                <circle cx="20" cy="20" r="30" fill="#0071E3" fillOpacity="0.12" />
                <rect x="6" y="6" width="28" height="28" rx="6" fill="#0F172A" />
                <line x1="20" y1="6" x2="20" y2="-8" stroke="#0071E3" strokeWidth="2.5" />
                <circle cx="20" cy="-8" r="4" fill="#0071E3" className="animate-ping" />
                <text x="45" y="24" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#0F172A">
                  Base Receiver
                </text>
              </g>

              {/* Waves */}
              <path d="M 60 40 Q 350 20 620 90" fill="none" stroke="#0071E3" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
              <path d="M 60 40 Q 300 160 560 260" fill="none" stroke="#0071E3" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />
              <path d="M 60 40 Q 220 200 240 280" fill="none" stroke="#0071E3" strokeWidth="2" strokeDasharray="6 6" opacity="0.8" />

              {/* Remote Sensors */}
              <g transform="translate(610, 80)">
                <circle cx="10" cy="10" r="14" fill="#0071E3" />
                <circle cx="10" cy="10" r="22" fill="none" stroke="#0071E3" strokeWidth="1.5" opacity="0.6" />
                <text x="-40" y="38" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Sensor #1 (2.2 km)
                </text>
              </g>

              <g transform="translate(550, 250)">
                <circle cx="10" cy="10" r="12" fill="#0071E3" />
                <text x="-35" y="36" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Sensor #2 (1.8 km)
                </text>
              </g>

              <g transform="translate(230, 270)">
                <circle cx="10" cy="10" r="12" fill="#0071E3" />
                <text x="-35" y="36" fontFamily="monospace" fontSize="11" fontWeight="bold" fill="#0F172A">
                  Sensor #3 (0.9 km)
                </text>
              </g>
            </svg>
          </div>

          {/* 4 Narrative Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#E2EBF5]">
            {SLIDE_1_DATA.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#0F172A]">
                <span className="text-[#0071E3] font-bold font-mono">0{i + 1}.</span>
                <span className="leading-snug">{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Question Card (5 cols) */}
        <div className="lg:col-span-5 p-6 lg:p-8 rounded-3xl bg-white border border-[#E2EBF5] shadow-xs flex flex-col justify-between w-full min-h-[380px]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-[#E0F2FE] text-[#0071E3]">
                <HelpCircle size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-[#0071E3] uppercase tracking-wider">
                Question to the Class
              </span>
            </div>

            <h3 className="font-serif text-2xl lg:text-3xl text-[#0F172A] leading-tight mb-4">
              &ldquo;{SLIDE_1_DATA.interactiveQuestion}&rdquo;
            </h3>

            {/* Multiple Choice Answers */}
            <div className="space-y-2.5">
              {SLIDE_1_DATA.interactiveOptions.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all interactive-hover flex items-center justify-between ${
                      isSelected
                        ? opt.correct
                          ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-medium"
                          : "bg-rose-50 border-rose-300 text-rose-950"
                        : "bg-[#F4F8FC] border-[#E2EBF5] hover:border-[#0071E3] text-[#0F172A]"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      opt.correct ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <XCircle size={16} className="text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Drawer */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                    SLIDE_1_DATA.interactiveOptions[selectedAnswer].correct
                      ? "bg-[#E0F2FE] border-[#0071E3]/30 text-[#0369A1]"
                      : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}
                >
                  <strong>Feedback: </strong>
                  {SLIDE_1_DATA.interactiveOptions[selectedAnswer].feedback}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5 pt-3 border-t border-[#E2EBF5] flex justify-end">
            <button
              onClick={onNextSlide}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0071E3] text-white font-sans text-xs sm:text-sm font-semibold hover:bg-[#0369A1] transition-all interactive-hover shadow-xs"
            >
              <span>Next: What is LoRa?</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
